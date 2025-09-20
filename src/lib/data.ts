/**
 * Mock data for the AI Chat Application
 * Contains realistic conversation examples for development and testing
 * Uses fixed IDs and timestamps for SSR compatibility
 */

import { Conversation } from './types';

// Mock conversations with realistic programming and design questions
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'تحسين أداء React مع useCallback',
    lastUpdated: new Date('2024-01-15T14:45:00Z'),
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:45:00Z',
    preview: 'كيف يمكنني تحسين أداء مكون React باستخدام useCallback؟',
    category: 'تطوير',
    tags: ['React', 'Performance', 'Hooks'],
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: 'كيف يمكنني تحسين أداء مكون React باستخدام useCallback؟ أواجه مشكلة في إعادة تصيير المكونات الفرعية بشكل غير ضروري.',
        timestamp: new Date('2024-01-15T14:40:00Z'),
        type: 'text'
      },
      {
        id: 'msg-1-2',
        role: 'assistant',
        content: 'useCallback هو hook مهم لتحسين الأداء في React. إليك كيفية استخدامه بفعالية:\n\n```javascript\nimport React, { useCallback, useState, memo } from \'react\';\n\nconst ParentComponent = () => {\n  const [count, setCount] = useState(0);\n  const [name, setName] = useState(\'\');\n\n  // بدون useCallback - يتم إنشاء دالة جديدة في كل render\n  const handleClick = () => {\n    console.log(\'Button clicked\');\n  };\n\n  // مع useCallback - نفس الدالة إلا إذا تغيرت dependencies\n  const optimizedHandleClick = useCallback(() => {\n    console.log(\'Optimized click\', count);\n  }, [count]);\n\n  return (\n    <div>\n      <input \n        value={name} \n        onChange={(e) => setName(e.target.value)} \n      />\n      <ChildComponent onClick={optimizedHandleClick} />\n      <button onClick={() => setCount(count + 1)}>Count: {count}</button>\n    </div>\n  );\n};\n```',
        timestamp: new Date('2024-01-15T14:42:00Z'),
        type: 'code'
      },
      {
        id: 'msg-1-3',
        role: 'user',
        content: 'شكراً للتوضيح! لكن كيف أعرف متى أحتاج لاستخدام useCallback؟ وما هي أفضل الممارسات؟',
        timestamp: new Date('2024-01-15T14:43:00Z'),
        type: 'text'
      },
      {
        id: 'msg-1-4',
        role: 'assistant',
        content: 'سؤال ممتاز! إليك أهم النقاط لمعرفة متى تستخدم useCallback:\n\n## متى تستخدم useCallback:\n\n1. **عند تمرير دالة كـ prop للمكونات الفرعية**\n2. **عندما تكون الدالة dependency لـ useEffect أو hooks أخرى**\n3. **في المكونات الكبيرة التي تعيد التصيير بكثرة**\n\n## أفضل الممارسات:\n\n```javascript\n// ✅ جيد - استخدم useCallback مع dependencies صحيحة\nconst handleSubmit = useCallback((data) => {\n  onSubmit(data, userId);\n}, [onSubmit, userId]);\n\n// ❌ خطأ شائع - نسيان dependencies\nconst handleSubmit = useCallback((data) => {\n  onSubmit(data, userId); // userId مفقود من dependencies\n}, [onSubmit]);\n\n// ✅ مع memo للمكون الفرعي\nconst ChildComponent = memo(({ onClick }) => {\n  return <button onClick={onClick}>اضغط هنا</button>;\n});\n```\n\n**تذكر:** useCallback له cost، فلا تستخدمه في كل مكان!',
        timestamp: new Date('2024-01-15T14:44:00Z'),
        type: 'code'
      },
      {
        id: 'msg-1-5',
        role: 'user',
        content: 'هذا واضح جداً! وماذا عن useMemo؟ هل هناك فرق؟',
        timestamp: new Date('2024-01-15T14:45:00Z'),
        type: 'text'
      },
      {
        id: 'msg-1-6',
        role: 'assistant',
        content: 'نعم هناك فرق مهم! إليك المقارنة:\n\n## useCallback vs useMemo:\n\n### useCallback:\n- **يحفظ الدالة نفسها**\n- يمنع إعادة إنشاء الدالة\n- مفيد للـ props والـ event handlers\n\n### useMemo:\n- **يحفظ نتيجة الحساب**\n- يمنع إعادة تنفيذ العمليات المكلفة\n- مفيد للعمليات الحسابية الثقيلة\n\n```javascript\n// useCallback للدوال\nconst handleClick = useCallback(() => {\n  doSomething(value);\n}, [value]);\n\n// useMemo للحسابات\nconst expensiveValue = useMemo(() => {\n  return heavyCalculation(data);\n}, [data]);\n\n// useMemo يمكن أن يحفظ دالة أيضاً\nconst memoizedCallback = useMemo(() => {\n  return () => doSomething(value);\n}, [value]);\n\n// هذا مكافئ لـ useCallback أعلاه\nconst callbackVersion = useCallback(() => {\n  doSomething(value);\n}, [value]);\n```\n\n**القاعدة الذهبية:** useCallback للدوال، useMemo للقيم المحسوبة!',
        timestamp: new Date('2024-01-15T14:46:00Z'),
        type: 'code'
      }
    ],
    metadata: {
      model: 'gpt-4',
      totalTokens: 1850,
      messageCount: 6
    }
  },
  {
    id: 'conv-2',
    title: 'أساسيات TypeScript للمبتدئين',
    lastUpdated: new Date('2024-01-14T12:15:00Z'),
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T12:15:00Z',
    preview: 'أريد تعلم TypeScript، من أين أبدأ؟',
    category: 'تعلم',
    tags: ['TypeScript', 'JavaScript', 'أساسيات'],
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content: 'أريد تعلم TypeScript، من أين أبدأ؟ أعرف JavaScript بشكل جيد.',
        timestamp: new Date('2024-01-14T09:00:00Z'),
        type: 'text'
      },
      {
        id: 'msg-2-2',
        role: 'assistant',
        content: 'ممتاز! بما أنك تعرف JavaScript، ستجد TypeScript سهل التعلم. إليك خطة للبداية:\n\n**1. فهم الأساسيات:**\n```typescript\n// Types الأساسية\nlet name: string = "أحمد";\nlet age: number = 25;\nlet isStudent: boolean = true;\nlet hobbies: string[] = ["قراءة", "برمجة"];\n\n// Objects\ninterface Person {\n  name: string;\n  age: number;\n  email?: string; // optional property\n}\n\nconst person: Person = {\n  name: "سارة",\n  age: 30\n};\n```',
        timestamp: new Date('2024-01-14T12:15:00Z'),
        type: 'code'
      }
    ],
    metadata: {
      model: 'gpt-4',
      totalTokens: 450,
      messageCount: 2
    }
  },
  {
    id: 'conv-3',
    title: 'Next.js App Router vs Pages Router',
    lastUpdated: new Date('2024-01-13T16:30:00Z'),
    createdAt: '2024-01-13T14:00:00Z',
    updatedAt: '2024-01-13T16:30:00Z',
    preview: 'ما الفرق بين App Router و Pages Router في Next.js؟',
    category: 'تطوير',
    tags: ['Next.js', 'React', 'Routing'],
    messages: [
      {
        id: 'msg-3-1',
        role: 'user',
        content: 'ما الفرق بين App Router و Pages Router في Next.js؟ أيهما أفضل لمشروع جديد؟',
        timestamp: new Date('2024-01-13T14:00:00Z'),
        type: 'text'
      },
      {
        id: 'msg-3-2',
        role: 'assistant',
        content: 'سؤال ممتاز! إليك الفروقات الرئيسية:\n\n**App Router (الجديد - Next.js 13+):**\n```\napp/\n├── layout.tsx     # Layout مشترك\n├── page.tsx       # الصفحة الرئيسية\n├── about/\n│   └── page.tsx   # صفحة About\n└── blog/\n    ├── layout.tsx # Layout خاص بالمدونة\n    └── [slug]/\n        └── page.tsx # صفحة مقال\n```\n\n**مميزات App Router:**\n1. **أداء أفضل** - Server Components افتراضياً\n2. **مرونة أكثر** - layouts متداخلة\n3. **تجربة مطور محسنة** - loading/error states',
        timestamp: new Date('2024-01-13T16:30:00Z'),
        type: 'code'
      }
    ],
    metadata: {
      model: 'gpt-4',
      totalTokens: 380,
      messageCount: 2
    }
  }
];