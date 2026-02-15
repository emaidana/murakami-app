import { useState, useEffect, useCallback } from 'react';

const reflections = [
  {
    theme: "On Loneliness and Connection",
    bookReference: "Norwegian Wood",
    thought: "Sometimes the deepest connections come from shared silence. Today, notice the quiet moments with others\u2014they often say more than words ever could.",
    lifeApplication: "Reach out to someone you\u2019ve been thinking about. You don\u2019t need a reason; sometimes \u2018I thought of you\u2019 is enough."
  },
  {
    theme: "On Lost Things",
    bookReference: "Kafka on the Shore",
    thought: "We\u2019re all searching for something we\u2019ve lost, even if we can\u2019t name it. That restlessness you feel isn\u2019t emptiness\u2014it\u2019s the compass pointing you forward.",
    lifeApplication: "What have you been avoiding because it feels too big or uncertain? Take one small step toward it today."
  },
  {
    theme: "On Music and Memory",
    bookReference: "Norwegian Wood",
    thought: "Certain songs hold entire seasons of our lives. Music is a time machine that needs no fuel but feeling.",
    lifeApplication: "Listen to a song that meant something to you years ago. Let yourself remember who you were then, and notice who you\u2019ve become."
  },
  {
    theme: "On Parallel Worlds",
    bookReference: "1Q84",
    thought: "Every choice creates a fork in the path. The life you didn\u2019t live exists somewhere in the realm of what-ifs, but the one you\u2019re living is the only one that\u2019s real.",
    lifeApplication: "Stop wondering \u2018what if\u2019 about a past decision. The you that exists now is the result of every choice\u2014honor that journey."
  },
  {
    theme: "On Wells and Depths",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "Sometimes you need to descend into your own depths to find what you\u2019re looking for. The answers aren\u2019t always on the surface.",
    lifeApplication: "Spend 10 minutes today in complete quiet\u2014no phone, no music, just you and your thoughts. What rises to the surface?"
  },
  {
    theme: "On Cats and Independence",
    bookReference: "Kafka on the Shore",
    thought: "Like cats, we need both companionship and solitude. There\u2019s wisdom in knowing when to seek warmth and when to wander alone.",
    lifeApplication: "Balance your day: if you\u2019ve been too social, carve out solo time. If you\u2019ve been too isolated, reach out."
  },
  {
    theme: "On Running",
    bookReference: "What I Talk About When I Talk About Running",
    thought: "Pain is inevitable. Suffering is optional. Keep moving forward, even when it\u2019s hard\u2014especially when it\u2019s hard.",
    lifeApplication: "What\u2019s one thing you\u2019ve been putting off because it seems difficult? Start it today, even if just for 5 minutes."
  },
  {
    theme: "On Dreams and Reality",
    bookReference: "Hard-Boiled Wonderland and the End of the World",
    thought: "The border between dream and waking is thinner than we think. Pay attention to both\u2014they\u2019re trying to tell you something.",
    lifeApplication: "Before bed tonight, write down one thing from today that felt surreal or meaningful. Dreams often start in daylight."
  },
  {
    theme: "On Ordinary Magic",
    bookReference: "After Dark",
    thought: "The most extraordinary things happen in ordinary moments\u2014a conversation at 3am, the way light falls through a window, the taste of coffee at dawn.",
    lifeApplication: "Notice one mundane moment today and really pay attention to it. Find the beauty hiding in plain sight."
  },
  {
    theme: "On Memory and Forgetting",
    bookReference: "South of the Border, West of the Sun",
    thought: "We can\u2019t choose what we remember or what we forget. But we can choose what to do with the memories that stay.",
    lifeApplication: "Think of a memory that keeps returning. What is it trying to teach you? Write it down."
  }
];

const formatDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const getDailyReflection = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return reflections[dayOfYear % reflections.length];
};

const MurakamiDaily = () => {
  const [currentReflection, setCurrentReflection] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setCurrentReflection(getDailyReflection());
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const handleTurnPage = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      let next;
      do {
        next = reflections[Math.floor(Math.random() * reflections.length)];
      } while (next.theme === currentReflection?.theme && reflections.length > 1);
      setCurrentReflection(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 600);
  }, [currentReflection]);

  if (!currentReflection) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-16 sm:px-6 sm:py-20"
         style={{ backgroundColor: '#FAF9F7' }}>
      <div
        className="w-full max-w-[560px] flex-1 flex flex-col"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 800ms ease-out',
        }}
      >
        {/* Header: Daily Murakami + subtitle */}
        <header className="mb-16 sm:mb-20">
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase mb-2"
             style={{ color: '#9a9a9a', fontWeight: 300 }}>
            Daily Murakami
          </p>
          <p className="font-sans text-[11px] tracking-[0.05em]"
             style={{ color: '#c8c8c8', fontWeight: 300 }}>
            A small piece of magic for your day
          </p>
        </header>

        {/* Theme title */}
        <h1
          className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-10 sm:mb-12"
          style={{
            color: '#1a1a1a',
            fontWeight: 400,
            letterSpacing: '-0.02em',
          }}
        >
          {currentReflection.theme}
        </h1>

        {/* Quote */}
        <blockquote className="mb-10 sm:mb-12">
          <p
            className="font-serif text-lg sm:text-xl leading-relaxed italic"
            style={{ color: '#6b6b6b', fontWeight: 400 }}
          >
            {currentReflection.thought}
          </p>
        </blockquote>

        {/* Divider */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <span style={{ color: '#c8c8c8', fontSize: '8px' }}>&bull;</span>
        </div>

        {/* A gentle nudge */}
        <section className="mb-16 sm:mb-20">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-4"
             style={{ color: '#9a9a9a', fontWeight: 300 }}>
            A gentle nudge
          </p>
          <p
            className="font-sans text-base leading-relaxed"
            style={{ color: '#6b6b6b', fontWeight: 300 }}
          >
            {currentReflection.lifeApplication}
          </p>
        </section>

        {/* Dedication + book reference */}
        <footer className="mt-auto pt-12">
          <p className="font-sans text-[11px] tracking-[0.05em] mb-1"
             style={{ color: '#c8c8c8', fontWeight: 300 }}>
            for Natalia
          </p>
          <p className="font-serif text-[12px] italic mb-12"
             style={{ color: '#c8c8c8' }}>
            {currentReflection.bookReference}
          </p>

          {/* Turn the page */}
          <button
            onClick={handleTurnPage}
            className="font-sans text-[11px] tracking-[0.15em] pb-[2px] cursor-pointer transition-colors duration-300"
            style={{
              color: '#9a9a9a',
              fontWeight: 300,
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #c8c8c8',
              padding: 0,
              paddingBottom: '2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#1a1a1a';
              e.currentTarget.style.borderBottomColor = '#1a1a1a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#9a9a9a';
              e.currentTarget.style.borderBottomColor = '#c8c8c8';
            }}
          >
            Turn the page
          </button>

          {/* Date */}
          <p className="font-sans text-[10px] tracking-[0.05em] mt-10"
             style={{ color: '#c8c8c8', fontWeight: 300 }}>
            {formatDate()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MurakamiDaily;
