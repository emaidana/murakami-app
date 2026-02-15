import { useState, useEffect, useCallback } from 'react';

const reflections = [
  // — Norwegian Wood —
  {
    theme: "On Loneliness and Connection",
    bookReference: "Norwegian Wood",
    thought: "Sometimes the deepest connections come from shared silence. Today, notice the quiet moments with others\u2014they often say more than words ever could.",
    lifeApplication: "Reach out to someone you\u2019ve been thinking about. You don\u2019t need a reason; sometimes \u2018I thought of you\u2019 is enough."
  },
  {
    theme: "On Music and Memory",
    bookReference: "Norwegian Wood",
    thought: "Certain songs hold entire seasons of our lives. Music is a time machine that needs no fuel but feeling.",
    lifeApplication: "Listen to a song that meant something to you years ago. Let yourself remember who you were then, and notice who you\u2019ve become."
  },
  {
    theme: "On Grief That Stays",
    bookReference: "Norwegian Wood",
    thought: "Death is not the opposite of life but a part of it. The people we\u2019ve lost don\u2019t disappear\u2014they become woven into who we are.",
    lifeApplication: "Think of someone you\u2019ve lost. What did they teach you that you still carry? Let that be enough for today."
  },
  {
    theme: "On Imperfect Love",
    bookReference: "Norwegian Wood",
    thought: "We don\u2019t fall in love with perfection. We fall in love with the cracks, the contradictions, the way someone holds their coffee cup at 2am.",
    lifeApplication: "Notice something imperfect about someone you love. Let it make you smile instead of wishing it were different."
  },
  {
    theme: "On Growing Up",
    bookReference: "Norwegian Wood",
    thought: "Youth isn\u2019t a time of life\u2014it\u2019s a state of perception. The world was never simpler then; we were just more willing to be confused by it.",
    lifeApplication: "Do something today that your younger self would have done without overthinking. Buy the flowers. Take the long way home."
  },
  {
    theme: "On Letters Unsent",
    bookReference: "Norwegian Wood",
    thought: "The words we never say accumulate like snow. They don\u2019t vanish\u2014they change the shape of the landscape between us.",
    lifeApplication: "Write down something you\u2019ve wanted to say to someone. You don\u2019t have to send it. Sometimes the writing is enough."
  },
  // — Kafka on the Shore —
  {
    theme: "On Lost Things",
    bookReference: "Kafka on the Shore",
    thought: "We\u2019re all searching for something we\u2019ve lost, even if we can\u2019t name it. That restlessness you feel isn\u2019t emptiness\u2014it\u2019s the compass pointing you forward.",
    lifeApplication: "What have you been avoiding because it feels too big or uncertain? Take one small step toward it today."
  },
  {
    theme: "On Cats and Independence",
    bookReference: "Kafka on the Shore",
    thought: "Like cats, we need both companionship and solitude. There\u2019s wisdom in knowing when to seek warmth and when to wander alone.",
    lifeApplication: "Balance your day: if you\u2019ve been too social, carve out solo time. If you\u2019ve been too isolated, reach out."
  },
  {
    theme: "On Libraries and Refuge",
    bookReference: "Kafka on the Shore",
    thought: "A library is not just a place for books. It\u2019s a place where you can be alone without being lonely, where silence is a form of company.",
    lifeApplication: "Find a quiet public space today\u2014a library, a park bench, a caf\u00e9 corner. Sit with yourself for fifteen minutes."
  },
  {
    theme: "On Fate and Free Will",
    bookReference: "Kafka on the Shore",
    thought: "Sometimes fate is like a small sandstorm that keeps changing directions. You change direction but the sandstorm chases you. Because the sandstorm isn\u2019t something that has nothing to do with you. It\u2019s you.",
    lifeApplication: "A problem you keep running from\u2014what if it\u2019s not chasing you, but trying to show you something? Turn and face it, even briefly."
  },
  {
    theme: "On Talking to Strangers",
    bookReference: "Kafka on the Shore",
    thought: "The most important conversations of our lives sometimes happen with people whose names we never learn. A stranger\u2019s kindness can rearrange everything.",
    lifeApplication: "Have a real exchange with someone you don\u2019t know today. A barista, a neighbor, someone on the train. Be present for it."
  },
  {
    theme: "On the Courage to Leave",
    bookReference: "Kafka on the Shore",
    thought: "Leaving isn\u2019t always running away. Sometimes it\u2019s running toward. The hardest journeys begin with a door we thought we\u2019d never open.",
    lifeApplication: "What\u2019s one thing in your life that you\u2019ve outgrown? Acknowledge it, even if you\u2019re not ready to let go yet."
  },
  // — 1Q84 —
  {
    theme: "On Parallel Worlds",
    bookReference: "1Q84",
    thought: "Every choice creates a fork in the path. The life you didn\u2019t live exists somewhere in the realm of what-ifs, but the one you\u2019re living is the only one that\u2019s real.",
    lifeApplication: "Stop wondering \u2018what if\u2019 about a past decision. The you that exists now is the result of every choice\u2014honor that journey."
  },
  {
    theme: "On Two Moons",
    bookReference: "1Q84",
    thought: "When you look at the world carefully enough, you start to see things others miss. Not because they aren\u2019t there\u2014but because most people have stopped looking.",
    lifeApplication: "On your next walk, look up. Really look. Notice the sky, the light, the edges of buildings. What do you see that you normally miss?"
  },
  {
    theme: "On Devotion",
    bookReference: "1Q84",
    thought: "To truly love someone is to recognize them across any distance, any disguise, any version of reality. Love is the constant in every equation.",
    lifeApplication: "Think of someone whose presence feels like home. Let them know, in whatever way feels true, that you see them."
  },
  {
    theme: "On Invisible Threads",
    bookReference: "1Q84",
    thought: "The connections that matter most are often invisible. Two people can be bound together across years and miles by something neither can name.",
    lifeApplication: "Who comes to mind when you\u2019re not trying to think of anyone? That\u2019s a thread worth following. Reach out."
  },
  {
    theme: "On Waiting",
    bookReference: "1Q84",
    thought: "Patience isn\u2019t passive. It\u2019s the hardest kind of action\u2014holding steady when everything in you wants to move, trusting that what\u2019s yours will find you.",
    lifeApplication: "Something you\u2019ve been impatient about\u2014can you let it breathe today? Trust the timing, even if it\u2019s uncomfortable."
  },
  {
    theme: "On Reading in the Dark",
    bookReference: "1Q84",
    thought: "Stories don\u2019t just describe reality\u2014they create it. The books you\u2019ve read have built rooms inside you that you live in without knowing.",
    lifeApplication: "Pick up a book you love. Open it anywhere. Read one paragraph and let it remind you of who you were when you first found it."
  },
  // — The Wind-Up Bird Chronicle —
  {
    theme: "On Wells and Depths",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "Sometimes you need to descend into your own depths to find what you\u2019re looking for. The answers aren\u2019t always on the surface.",
    lifeApplication: "Spend 10 minutes today in complete quiet\u2014no phone, no music, just you and your thoughts. What rises to the surface?"
  },
  {
    theme: "On the Mundane and the Profound",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "The most surreal things begin on the most ordinary days. You\u2019re boiling water for pasta and suddenly the entire shape of your life becomes visible.",
    lifeApplication: "Pay attention to your routines today. There\u2019s something hiding in the ordinary that wants to be noticed."
  },
  {
    theme: "On Disappearance",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "People disappear from our lives in many ways\u2014not just by leaving, but by becoming someone we no longer recognize. The grief is the same.",
    lifeApplication: "Is there a relationship that has quietly changed shape? Name it to yourself. Acknowledging the shift is the first kind of honesty."
  },
  {
    theme: "On Darkness as Teacher",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "The dark isn\u2019t empty. It\u2019s full of information your eyes can\u2019t process yet. Stay long enough and you begin to see differently.",
    lifeApplication: "A difficult feeling you\u2019ve been pushing away\u2014sit with it for just a moment. What is it trying to tell you?"
  },
  {
    theme: "On Domestic Mysteries",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "The greatest mysteries aren\u2019t in distant lands. They\u2019re in the kitchen, in the hallway, in the silence between two people who share a life.",
    lifeApplication: "Look around your own space with fresh eyes. What do your surroundings say about who you\u2019ve become?"
  },
  {
    theme: "On Names and Identity",
    bookReference: "The Wind-Up Bird Chronicle",
    thought: "A name is just the beginning of knowing someone. The real person lives in the spaces between what they say and what they mean.",
    lifeApplication: "Listen more carefully today\u2014not just to words, but to what\u2019s underneath them. What is someone around you really saying?"
  },
  // — What I Talk About When I Talk About Running —
  {
    theme: "On Running",
    bookReference: "What I Talk About When I Talk About Running",
    thought: "Pain is inevitable. Suffering is optional. Keep moving forward, even when it\u2019s hard\u2014especially when it\u2019s hard.",
    lifeApplication: "What\u2019s one thing you\u2019ve been putting off because it seems difficult? Start it today, even if just for 5 minutes."
  },
  {
    theme: "On Discipline as Love",
    bookReference: "What I Talk About When I Talk About Running",
    thought: "Talent is nothing without the daily act of showing up. The work itself is the devotion\u2014not the result, not the recognition, just the doing.",
    lifeApplication: "What\u2019s your craft, your practice, your thing? Do it today, even for ten minutes. Not to finish\u2014just to show up."
  },
  {
    theme: "On the Body\u2019s Wisdom",
    bookReference: "What I Talk About When I Talk About Running",
    thought: "Your body knows things your mind hasn\u2019t figured out yet. Tension, fatigue, lightness\u2014they\u2019re all messages if you learn to listen.",
    lifeApplication: "Check in with your body right now. Where are you holding tension? Breathe into that spot. Your body has been waiting for you to notice."
  },
  {
    theme: "On Endurance",
    bookReference: "What I Talk About When I Talk About Running",
    thought: "The point isn\u2019t to win. The point is to keep going after the moment when every part of you wants to stop. That\u2019s where the real version of you lives.",
    lifeApplication: "When you hit resistance today\u2014in work, in a conversation, in a run\u2014push through just one more minute. See what\u2019s on the other side."
  },
  {
    theme: "On Solitary Rhythm",
    bookReference: "What I Talk About When I Talk About Running",
    thought: "Some things can only be understood alone, at your own pace, in your own rhythm. Not everything needs to be shared to be real.",
    lifeApplication: "Do something alone today that you usually do with others. Walk, eat, sit. Notice how the experience changes."
  },
  // — Hard-Boiled Wonderland and the End of the World —
  {
    theme: "On Dreams and Reality",
    bookReference: "Hard-Boiled Wonderland and the End of the World",
    thought: "The border between dream and waking is thinner than we think. Pay attention to both\u2014they\u2019re trying to tell you something.",
    lifeApplication: "Before bed tonight, write down one thing from today that felt surreal or meaningful. Dreams often start in daylight."
  },
  {
    theme: "On the Mind\u2019s Landscape",
    bookReference: "Hard-Boiled Wonderland and the End of the World",
    thought: "Inside every person is an entire world\u2014a town, a forest, a wall. We spend our lives exploring the outer world while barely visiting the inner one.",
    lifeApplication: "Close your eyes for a moment and picture your inner landscape. What does it look like today? A forest? A city? An ocean? Just notice."
  },
  {
    theme: "On Shadows",
    bookReference: "Hard-Boiled Wonderland and the End of the World",
    thought: "Your shadow isn\u2019t your enemy. It\u2019s the part of you that remembers what you\u2019ve tried to forget. It walks beside you whether you acknowledge it or not.",
    lifeApplication: "What part of yourself have you been ignoring? Give it five minutes of your attention. It doesn\u2019t need fixing\u2014just acknowledgment."
  },
  {
    theme: "On Losing Your Mind",
    bookReference: "Hard-Boiled Wonderland and the End of the World",
    thought: "The most terrifying thing isn\u2019t losing your mind. It\u2019s discovering that what you thought was real was only one version of the story.",
    lifeApplication: "A belief you\u2019ve held for a long time\u2014what if you questioned it today? Not to destroy it, just to see it from another angle."
  },
  {
    theme: "On Walls We Build",
    bookReference: "Hard-Boiled Wonderland and the End of the World",
    thought: "Every wall exists for a reason, but sometimes we forget what we were protecting. The wall remains long after the danger has passed.",
    lifeApplication: "Is there a boundary in your life that no longer serves you? Something you\u2019re guarding out of habit rather than need?"
  },
  // — After Dark —
  {
    theme: "On Ordinary Magic",
    bookReference: "After Dark",
    thought: "The most extraordinary things happen in ordinary moments\u2014a conversation at 3am, the way light falls through a window, the taste of coffee at dawn.",
    lifeApplication: "Notice one mundane moment today and really pay attention to it. Find the beauty hiding in plain sight."
  },
  {
    theme: "On Night People",
    bookReference: "After Dark",
    thought: "The city at night belongs to different people\u2014those who can\u2019t sleep, those who won\u2019t sleep, those whose real lives begin when the rest of the world closes its eyes.",
    lifeApplication: "If you\u2019re awake late tonight, don\u2019t fight it. Step outside or look out the window. The world is different at this hour. Let it be."
  },
  {
    theme: "On Watching and Being Watched",
    bookReference: "After Dark",
    thought: "We\u2019re always being observed by life itself\u2014by the light, by time, by the quiet attention of the universe. You don\u2019t have to perform. Just be.",
    lifeApplication: "Stop curating yourself for a moment today. No filter, no performance. Just exist as you are, even if only for five minutes."
  },
  {
    theme: "On Strangers in the Night",
    bookReference: "After Dark",
    thought: "The people we meet between midnight and dawn know us differently. Darkness strips away pretense. We become more honest when we\u2019re tired.",
    lifeApplication: "The next time you\u2019re tired and someone asks how you are, try telling the truth. Fatigue is a kind of permission."
  },
  {
    theme: "On Small Acts of Kindness",
    bookReference: "After Dark",
    thought: "A cup of coffee offered at the right moment can save a life. Not dramatically\u2014quietly, in the way that most saving actually happens.",
    lifeApplication: "Do one small, kind thing for someone today without being asked. Pay for their coffee. Hold the door a beat longer. Mean it."
  },
  // — South of the Border, West of the Sun —
  {
    theme: "On Memory and Forgetting",
    bookReference: "South of the Border, West of the Sun",
    thought: "We can\u2019t choose what we remember or what we forget. But we can choose what to do with the memories that stay.",
    lifeApplication: "Think of a memory that keeps returning. What is it trying to teach you? Write it down."
  },
  {
    theme: "On the One Who Got Away",
    bookReference: "South of the Border, West of the Sun",
    thought: "There\u2019s always someone who exists in the conditional tense of our lives\u2014the person we might have been with, the life we almost lived. They teach us what we truly want.",
    lifeApplication: "Instead of mourning a path not taken, ask: what does that longing reveal about what you need right now? Follow that thread."
  },
  {
    theme: "On Thirst",
    bookReference: "South of the Border, West of the Sun",
    thought: "There\u2019s a kind of thirst that water can\u2019t quench. It\u2019s the longing for something just beyond reach\u2014not a thing, but a feeling, a version of yourself.",
    lifeApplication: "What are you hungry for that has nothing to do with food? Name it honestly. That\u2019s the first step toward finding it."
  },
  {
    theme: "On Comfortable Lives",
    bookReference: "South of the Border, West of the Sun",
    thought: "It\u2019s possible to build a beautiful life and still feel a hollow echo at its center. Comfort isn\u2019t the same as wholeness.",
    lifeApplication: "Look at your life with gentle honesty. Where are you comfortable but not alive? You don\u2019t have to fix it\u2014just see it."
  },
  {
    theme: "On Rain",
    bookReference: "South of the Border, West of the Sun",
    thought: "Rain doesn\u2019t ask permission. It arrives, changes everything, and leaves the world looking different. Some feelings are like that.",
    lifeApplication: "If an unexpected emotion arrives today, don\u2019t rush to explain it. Let it rain. Let it pass. See what it leaves behind."
  },
  {
    theme: "On Seasons of the Heart",
    bookReference: "South of the Border, West of the Sun",
    thought: "We have our own seasons\u2014times of growth and times of quiet dormancy. Winter isn\u2019t failure. It\u2019s preparation.",
    lifeApplication: "If you\u2019re in a quiet season, stop forcing bloom. Rest is not laziness. Sometimes the most productive thing is stillness."
  },
];

const formatDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const getDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const seedFromDate = (dateStr) => {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const getDailyReflection = () => {
  const key = getDateKey();
  const index = seedFromDate(key) % reflections.length;
  return reflections[index];
};

const MurakamiDaily = () => {
  const [page, setPage] = useState('cover'); // 'cover' | 'transitioning' | 'content'
  const [coverVisible, setCoverVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [currentReflection, setCurrentReflection] = useState(null);
  const [journalText, setJournalText] = useState('');

  useEffect(() => {
    setCurrentReflection(getDailyReflection());
    const saved = localStorage.getItem(`murakami-journal-${getDateKey()}`);
    if (saved) setJournalText(saved);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setCoverVisible(true));
    });
  }, []);

  const handleEnter = useCallback(() => {
    if (page !== 'cover') return;
    setCoverVisible(false);
    setPage('transitioning');
    setTimeout(() => {
      setPage('content');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setContentVisible(true));
      });
    }, 800);
  }, [page]);

  const handleJournalChange = useCallback((e) => {
    const value = e.target.value;
    setJournalText(value);
    if (value) {
      localStorage.setItem(`murakami-journal-${getDateKey()}`, value);
    } else {
      localStorage.removeItem(`murakami-journal-${getDateKey()}`);
    }
  }, []);

  const handleTurnPage = useCallback(() => {
    setContentVisible(false);
    setTimeout(() => {
      let next;
      do {
        next = reflections[Math.floor(Math.random() * reflections.length)];
      } while (next.theme === currentReflection?.theme && reflections.length > 1);
      setCurrentReflection(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setContentVisible(true));
      });
    }, 600);
  }, [currentReflection]);

  if (!currentReflection) return null;

  // — Cover page —
  if (page === 'cover' || page === 'transitioning') {
    return (
      <div
        className="min-h-screen flex items-center justify-center cursor-pointer"
        style={{ backgroundColor: '#FAF9F7' }}
        onClick={handleEnter}
      >
        <div
          className="text-center"
          style={{
            opacity: coverVisible ? 1 : 0,
            transition: 'opacity 800ms ease-out',
          }}
        >
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
             style={{ color: '#9a9a9a', fontWeight: 300 }}>
            Daily Murakami
          </p>
          <p className="font-sans text-[13px] tracking-[0.02em] mb-16"
             style={{ color: '#c8c8c8', fontWeight: 300 }}>
            A small piece of magic for your day
          </p>
          <button
            className="font-sans text-[11px] tracking-[0.15em] cursor-pointer"
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
            Turn to today
          </button>
        </div>
      </div>
    );
  }

  // — Content page —
  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-16 sm:px-6 sm:py-20"
         style={{ backgroundColor: '#FAF9F7' }}>
      <div
        className="w-full max-w-[560px] flex-1 flex flex-col"
        style={{
          opacity: contentVisible ? 1 : 0,
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

        {/* Journal — a thought to keep */}
        <section className="mb-16 sm:mb-20">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-4"
             style={{ color: '#9a9a9a', fontWeight: 300 }}>
            A thought to keep
          </p>
          <textarea
            value={journalText}
            onChange={handleJournalChange}
            placeholder="..."
            rows={4}
            className="w-full font-sans text-base leading-relaxed resize-none outline-none"
            style={{
              color: '#1a1a1a',
              fontWeight: 300,
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid #e8e6e3',
              paddingBottom: '12px',
              caretColor: '#9a9a9a',
            }}
          />
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
