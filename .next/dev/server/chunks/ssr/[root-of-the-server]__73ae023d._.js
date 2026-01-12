module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const API_BASE = 'http://localhost:8000/api/v1';
function Home() {
    const [assessmentId, setAssessmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [responses, setResponses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedCategoryId, setSelectedCategoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_name: 'Test Company',
                startup_stage: 'seed'
            })
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
    async function answer(questionId, value) {
        setResponses((prev)=>({
                ...prev,
                [questionId]: value
            }));
        if (assessmentId) {
            try {
                await fetch(`${API_BASE}/assessments/${assessmentId}/responses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        assessment_id: assessmentId,
                        question_id: questionId,
                        answer_value: {
                            value
                        }
                    })
                });
            } catch (error) {
                console.error('Save failed:', error);
            }
        }
    }
    function shouldHideQuestion(q) {
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
    const groupedByCategory = questions.reduce((acc, q)=>{
        // Find the section for this question
        const section = sections.find((s)=>s.id === q.section_id);
        if (!section) return acc; // Skip if section not found
        const categoryId = section.category_id;
        const categoryName = categories.find((c)=>c.id === categoryId)?.name || 'Unknown Category';
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
    }, {});
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.loader,
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 129,
            columnNumber: 53
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 129,
        columnNumber: 23
    }, this);
    const totalQuestions = questions.length;
    const conditionalQuestions = questions.filter((q)=>q.depends_on_question_id).length;
    const visibleQuestions = questions.filter((q)=>!shouldHideQuestion(q)).length;
    const hiddenQuestions = totalQuestions - visibleQuestions;
    // Filter to show only selected category
    const filteredCategories = selectedCategoryId ? Object.entries(groupedByCategory).filter(([catId])=>Number(catId) === selectedCategoryId) : Object.entries(groupedByCategory);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: styles.title,
                children: "Scale DUX - Assessment Flow"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.subtitle,
                children: [
                    "Assessment ID: ",
                    assessmentId
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.debugPanel,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Debug Info:"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    " ",
                    totalQuestions,
                    " total | ",
                    conditionalQuestions,
                    " conditional | ",
                    visibleQuestions,
                    " visible | ",
                    hiddenQuestions,
                    " hidden"
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            categories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.categoryTabs,
                children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedCategoryId(cat.id),
                        style: {
                            ...styles.categoryTab,
                            ...selectedCategoryId === cat.id ? styles.categoryTabActive : {}
                        },
                        children: [
                            cat.name,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.categoryTabCount,
                                children: [
                                    "(",
                                    groupedByCategory[cat.id] ? Object.values(groupedByCategory[cat.id].sections).flat().length : 0,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this)
                        ]
                    }, cat.id, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 154,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this),
            filteredCategories.map(([categoryId, categoryData])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.categoryContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.categoryHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: styles.categoryTitle,
                                    children: categoryData.name
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.categorySubtitle,
                                    children: [
                                        Object.keys(categoryData.sections).length,
                                        " sections |",
                                        Object.values(categoryData.sections).flat().length,
                                        " questions"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this),
                        Object.entries(categoryData.sections).map(([sectionName, qs])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: styles.sectionTitle,
                                        children: sectionName
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this),
                                    qs.map((q)=>{
                                        if (shouldHideQuestion(q)) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.question,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.questionCode,
                                                    children: [
                                                        q.code,
                                                        " ",
                                                        q.is_required && '(Required)',
                                                        q.depends_on_question_id && ' 🔗 Conditional'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.questionText,
                                                    children: q.text
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 21
                                                }, this),
                                                q.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.questionDesc,
                                                    children: q.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 39
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionInput, {
                                                    question: q,
                                                    value: responses[q.id],
                                                    onChange: (v)=>answer(q.id, v)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, q.id, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, this);
                                    })
                                ]
                            }, sectionName, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this))
                    ]
                }, categoryId, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
function QuestionInput({ question, value, onChange }) {
    if (question.question_type === 'toggle') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.toggleGroup,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: {
                        ...styles.toggleBtn,
                        ...value === true ? styles.toggleBtnActive : {}
                    },
                    onClick: ()=>onChange(true),
                    children: "Yes"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: {
                        ...styles.toggleBtn,
                        ...value === false ? styles.toggleBtnActive : {}
                    },
                    onClick: ()=>onChange(false),
                    children: "No"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, this);
    }
    if (question.question_type === 'number') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "number",
            style: styles.input,
            value: value || '',
            onChange: (e)=>onChange(Number(e.target.value)),
            placeholder: "Enter number"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 230,
            columnNumber: 7
        }, this);
    }
    if (question.question_type === 'dropdown' && question.options) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            style: styles.input,
            value: value || '',
            onChange: (e)=>onChange(e.target.value),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: "",
                    children: "Select..."
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this),
                question.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: opt,
                        children: opt
                    }, opt, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 242,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: "text",
        style: styles.input,
        value: value || '',
        onChange: (e)=>onChange(e.target.value),
        placeholder: "Enter answer"
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '8px'
    },
    subtitle: {
        color: '#666',
        marginBottom: '10px'
    },
    debugPanel: {
        padding: '12px',
        background: '#fffbeb',
        border: '1px solid #fcd34d',
        borderRadius: '6px',
        marginBottom: '20px',
        fontSize: '14px'
    },
    categoryTabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '0'
    },
    categoryTab: {
        padding: '12px 24px',
        background: 'white',
        border: 'none',
        borderBottom: '3px solid transparent',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        color: '#6b7280',
        transition: 'all 0.2s',
        outline: 'none'
    },
    categoryTabActive: {
        color: '#667eea',
        borderBottomColor: '#667eea',
        background: '#f3f4ff'
    },
    categoryTabCount: {
        marginLeft: '8px',
        fontSize: '14px',
        opacity: 0.7
    },
    categoryContainer: {
        marginBottom: '50px',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden'
    },
    categoryHeader: {
        padding: '30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
    },
    categoryTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: 'white'
    },
    categorySubtitle: {
        fontSize: '14px',
        opacity: 0.9,
        color: 'white',
        margin: 0
    },
    section: {
        marginBottom: '0',
        padding: '25px',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb'
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '2px solid #667eea'
    },
    question: {
        marginBottom: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '6px',
        borderLeft: '4px solid #667eea',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    questionCode: {
        fontSize: '12px',
        color: '#999',
        marginBottom: '5px'
    },
    questionText: {
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '8px',
        color: '#1f2937'
    },
    questionDesc: {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '12px'
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    },
    toggleGroup: {
        display: 'flex',
        gap: '10px'
    },
    toggleBtn: {
        flex: 1,
        padding: '10px',
        border: '2px solid #ddd',
        background: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    toggleBtnActive: {
        background: '#667eea',
        color: 'white',
        borderColor: '#667eea'
    },
    loader: {
        textAlign: 'center',
        padding: '40px',
        color: '#666'
    }
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__73ae023d._.js.map