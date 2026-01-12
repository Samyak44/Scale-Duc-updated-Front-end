'use client';
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api/v1';

export default function Home() {
  const [assessmentId, setAssessmentId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const assessment = await createAssessment();
      setAssessmentId(assessment.id);
      const [qs, cats, secs] = await Promise.all([
        loadQuestions(),
        loadCategories(),
        loadSections()
      ]);
      setQuestions(qs);
      setCategories(cats);
      setSections(secs);
      // Set first category as selected by default
      if (cats.length > 0) {
        setSelectedCategoryId(cats[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Init error:', error);
      setLoading(false);
    }
  }

  async function createAssessment() {
    const res = await fetch(`${API_BASE}/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name: 'Test Company', startup_stage: 'seed' })
    });
    return res.json();
  }

  async function loadQuestions() {
    const res = await fetch(`${API_BASE}/questions?limit=500`);
    return res.json();
  }

  async function loadCategories() {
    const res = await fetch(`${API_BASE}/categories?limit=100`);
    return res.json();
  }

  async function loadSections() {
    const res = await fetch(`${API_BASE}/sections?limit=200`);
    return res.json();
  }

  async function answer(questionId: number, value: any) {
    setResponses(prev => ({ ...prev, [questionId]: value }));

    if (assessmentId) {
      try {
        await fetch(`${API_BASE}/assessments/${assessmentId}/responses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessment_id: assessmentId,
            question_id: questionId,
            answer_value: { value }
          })
        });
      } catch (error) {
        console.error('Save failed:', error);
      }
    }
  }

  function shouldHideQuestion(q: any) {
    if (!q.depends_on_question_id) return false;

    const parentResponse = responses[q.depends_on_question_id];

    // If parent hasn't been answered, hide this question
    if (parentResponse === undefined || parentResponse === null) return true;

    // Compare the response with expected value
    const actualValue = String(parentResponse);
    const expectedValue = q.depends_on_value;

    console.log(`Question ${q.code}: depends on ID ${q.depends_on_question_id}, expected="${expectedValue}", actual="${actualValue}", hide=${actualValue !== expectedValue}`);

    return actualValue !== expectedValue;
  }

  // Group questions by category, then by section
  const groupedByCategory = questions.reduce((acc, q) => {
    // Find the section for this question
    const section = sections.find(s => s.id === q.section_id);
    if (!section) return acc; // Skip if section not found

    const categoryId = section.category_id;
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Unknown Category';
    const sectionName = section.name || 'Questions';

    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name: categoryName,
        sections: {}
      };
    }

    if (!acc[categoryId].sections[sectionName]) {
      acc[categoryId].sections[sectionName] = [];
    }

    acc[categoryId].sections[sectionName].push(q);
    return acc;
  }, {} as Record<number, { id: number; name: string; sections: Record<string, any[]> }>);

  if (loading) return <div style={styles.container}><div style={styles.loader}>Loading...</div></div>;

  const totalQuestions = questions.length;
  const conditionalQuestions = questions.filter(q => q.depends_on_question_id).length;
  const visibleQuestions = questions.filter(q => !shouldHideQuestion(q)).length;
  const hiddenQuestions = totalQuestions - visibleQuestions;

  // Filter to show only selected category
  const filteredCategories = selectedCategoryId
    ? Object.entries(groupedByCategory).filter(([catId]) => Number(catId) === selectedCategoryId)
    : Object.entries(groupedByCategory);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Scale DUX - Assessment Flow</h1>
      <p style={styles.subtitle}>Assessment ID: {assessmentId}</p>

      <div style={styles.debugPanel}>
        <strong>Debug Info:</strong> {totalQuestions} total | {conditionalQuestions} conditional | {visibleQuestions} visible | {hiddenQuestions} hidden
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div style={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              style={{
                ...styles.categoryTab,
                ...(selectedCategoryId === cat.id ? styles.categoryTabActive : {})
              }}
            >
              {cat.name}
              <span style={styles.categoryTabCount}>
                ({groupedByCategory[cat.id] ? Object.values(groupedByCategory[cat.id].sections).flat().length : 0})
              </span>
            </button>
          ))}
        </div>
      )}

      {filteredCategories.map(([categoryId, categoryData]) => (
        <div key={categoryId} style={styles.categoryContainer}>
          {/* Category Header */}
          <div style={styles.categoryHeader}>
            <h1 style={styles.categoryTitle}>{categoryData.name}</h1>
            <p style={styles.categorySubtitle}>
              {Object.keys(categoryData.sections).length} sections |
              {Object.values(categoryData.sections).flat().length} questions
            </p>
          </div>

          {/* Sections within this category */}
          {Object.entries(categoryData.sections).map(([sectionName, qs]) => (
            <div key={sectionName} style={styles.section}>
              <h2 style={styles.sectionTitle}>{sectionName}</h2>
              {qs.map((q: any) => {
                if (shouldHideQuestion(q)) return null;
                return (
                  <div key={q.id} style={styles.question}>
                    <div style={styles.questionCode}>
                      {q.code} {q.is_required && '(Required)'}
                      {q.depends_on_question_id && ' 🔗 Conditional'}
                    </div>
                    <div style={styles.questionText}>{q.text}</div>
                    {q.description && <div style={styles.questionDesc}>{q.description}</div>}
                    <QuestionInput question={q} value={responses[q.id]} onChange={(v) => answer(q.id, v)} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function QuestionInput({ question, value, onChange }: any) {
  if (question.question_type === 'toggle') {
    return (
      <div style={styles.toggleGroup}>
        <button
          style={{ ...styles.toggleBtn, ...(value === true ? styles.toggleBtnActive : {}) }}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          style={{ ...styles.toggleBtn, ...(value === false ? styles.toggleBtnActive : {}) }}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    );
  }

  if (question.question_type === 'number') {
    return (
      <input
        type="number"
        style={styles.input}
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="Enter number"
      />
    );
  }

  if (question.question_type === 'dropdown' && question.options) {
    return (
      <select style={styles.input} value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select...</option>
        {question.options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      style={styles.input}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter answer"
    />
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' } as React.CSSProperties,
  title: { fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' } as React.CSSProperties,
  subtitle: { color: '#666', marginBottom: '10px' } as React.CSSProperties,
  debugPanel: { padding: '12px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' } as React.CSSProperties,
  categoryTabs: { display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '0' } as React.CSSProperties,
  categoryTab: { padding: '12px 24px', background: 'white', border: 'none', borderBottom: '3px solid transparent', cursor: 'pointer', fontSize: '16px', fontWeight: '500', color: '#6b7280', transition: 'all 0.2s', outline: 'none' } as React.CSSProperties,
  categoryTabActive: { color: '#667eea', borderBottomColor: '#667eea', background: '#f3f4ff' } as React.CSSProperties,
  categoryTabCount: { marginLeft: '8px', fontSize: '14px', opacity: 0.7 } as React.CSSProperties,
  categoryContainer: { marginBottom: '50px', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' } as React.CSSProperties,
  categoryHeader: { padding: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' } as React.CSSProperties,
  categoryTitle: { fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: 'white' } as React.CSSProperties,
  categorySubtitle: { fontSize: '14px', opacity: 0.9, color: 'white', margin: 0 } as React.CSSProperties,
  section: { marginBottom: '0', padding: '25px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' } as React.CSSProperties,
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px', paddingBottom: '10px', borderBottom: '2px solid #667eea' } as React.CSSProperties,
  question: { marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '6px', borderLeft: '4px solid #667eea', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } as React.CSSProperties,
  questionCode: { fontSize: '12px', color: '#999', marginBottom: '5px' } as React.CSSProperties,
  questionText: { fontSize: '16px', fontWeight: '500', marginBottom: '8px', color: '#1f2937' } as React.CSSProperties,
  questionDesc: { fontSize: '14px', color: '#6b7280', marginBottom: '12px' } as React.CSSProperties,
  input: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' } as React.CSSProperties,
  toggleGroup: { display: 'flex', gap: '10px' } as React.CSSProperties,
  toggleBtn: { flex: 1, padding: '10px', border: '2px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' } as React.CSSProperties,
  toggleBtnActive: { background: '#667eea', color: 'white', borderColor: '#667eea' } as React.CSSProperties,
  loader: { textAlign: 'center', padding: '40px', color: '#666' } as React.CSSProperties,
};
