const allStories = [
    {
        id: 1,
        title: "From Heartbreak to Healing",
        preview: "After 5 years together, I never thought I'd recover from that breakup...",
        fullStory: `After 5 years together, I never thought I'd recover from that breakup. Blure's analysis showed me patterns I was blind to - my tendency to compromise too much and ignore red flags. The AI highlighted how our communication styles clashed and our core values had grown apart.

        The hardest part was accepting that sometimes love isn't enough. Through Blure's guidance, I learned to focus on self-growth. A year later, I'm stronger, more confident, and actually grateful for the experience. It wasn't just a breakup prediction - it was a wake-up call that helped me rediscover myself.`,
        emotion: "💪",
        timeAgo: "8 months ago",
        image: success1
    },
    {
        id: 2,
        title: "The Warning Sign I Needed",
        preview: "Blure's prediction came at the perfect time...",
        fullStory: `Blure's prediction came at the perfect time. The app analyzed our text conversations and pointed out concerning patterns - the passive-aggressive responses, the decreasing quality time, and the misaligned future goals. Initially, I was skeptical, but the AI's detailed analysis of our communication patterns was eye-opening.

        Instead of waiting for things to fall apart, I initiated an honest conversation with my partner. While we ultimately decided to part ways, doing so with awareness and maturity made all the difference. It wasn't the ending I expected, but it was the clarity I needed.`,
        emotion: "🎯",
        timeAgo: "3 months ago",
        image: success2,
    },
    {
        id: 3,
        title: "Second Chance at Happiness",
        preview: "What seemed like the end became a new beginning...",
        fullStory: `What seemed like the end became a new beginning. After my relationship of 3 years ended, Blure didn't just help me understand why - it helped me grow. The app's analysis showed how my fear of vulnerability was pushing people away.

        Working through the app's personalized healing journey, I learned to communicate better and set healthy boundaries. Today, I'm in a new relationship that's stronger because I did the work to understand myself first. Sometimes, a breakup is just the universe's way of redirecting you to where you need to be.`,
        emotion: "🌟",
        timeAgo: "1 month ago",
        image: success3
    },
    {
        id: 4,
        title: "Finding Strength in Letting Go",
        preview: "I was holding onto a relationship that wasn't serving either of us...",
        fullStory: `I was holding onto a relationship that wasn't serving either of us. Blure's analysis revealed patterns of codependency that I hadn't recognized. The app showed me how our relationship dynamics were affecting both our personal growth.

        Making the decision to end things was difficult, but Blure's guidance helped me understand that sometimes letting go is the most loving thing you can do. Six months later, we're both in a better place, growing individually. Sometimes the bravest thing you can do is choose yourself.`,
        emotion: "🦋",
        timeAgo: "6 months ago",
        image: success2,
    },
    {
        id: 5,
        title: "When AI Sees What You Can't",
        preview: "The patterns were there all along, but I couldn't see them...",
        fullStory: `The patterns were there all along, but I couldn't see them. Blure analyzed our messages and pointed out how our communication had shifted over the past year. The passive-aggressive undertones, the delayed responses, the emotional distance - it was all there in the data.

        What I appreciated most was how the app didn't just point out problems but offered actionable insights. Though we ultimately separated, the awareness I gained helped me maintain dignity and respect throughout the process. Now I know what healthy communication looks like.`,
        emotion: "🔍",
        timeAgo: "4 months ago",
        image: success3,
    },
    {
        id: 6,
        title: "Growth Through Understanding",
        preview: "Blure showed me it wasn't about blame...",
        fullStory: `Blure showed me it wasn't about blame, but about understanding. The AI analysis revealed how both our attachment styles were creating a cycle of misunderstandings. It wasn't that either of us was wrong - we just spoke different emotional languages.

        This insight changed everything. Even though we didn't stay together, I learned so much about myself and what I need in a relationship. The healing journey wasn't just about getting over someone, but about growing into a better version of myself.`,
        emotion: "🌱",
        timeAgo: "2 months ago",
        image: success1,
    },
    {
        id: 7,
        title: "Learning to Trust Again",
        preview: "The AI analysis helped me understand my trust issues...",
        fullStory: `After a devastating betrayal, I thought I'd never be able to trust again. Blure's analysis helped me understand my defensive patterns and how they were affecting my new relationships. The app showed me that while my caution was understandable, I was letting past hurt dictate my future.

        Through the guided healing process, I learned to differentiate between healthy skepticism and paranoia. Today, I'm in a relationship where I can be vulnerable without feeling threatened. It's amazing how understanding your patterns can help you break free from them.`,
        emotion: "🗝️",
        timeAgo: "5 months ago",
        image: success1
    },
    {
        id: 8,
        title: "Breaking Free from Toxic Patterns",
        preview: "I kept repeating the same relationship mistakes...",
        fullStory: `I kept repeating the same relationship mistakes until Blure showed me my pattern. The AI analysis revealed how I was unconsciously seeking partners who reminded me of past trauma. It was like looking in a mirror I'd been avoiding.

        The app's insights helped me understand why I was attracted to certain personality types and how this was holding me back. Now, I'm more conscious of my choices and have learned to prioritize emotional availability and healthy communication.`,
        emotion: "🔓",
        timeAgo: "7 months ago",
        image: success2
    },
    {
        id: 9,
        title: "Finding Peace in Solitude",
        preview: "Blure taught me that being alone isn't being lonely...",
        fullStory: `Blure taught me that being alone isn't being lonely. After my divorce, I was desperate to fill the void. The app's analysis showed how this desperation was affecting my judgment and self-worth.

        Through guided self-discovery, I learned to enjoy my own company. I discovered hobbies I love, rebuilt friendships I'd neglected, and found strength I never knew I had. When I eventually started dating again, it was from a place of want, not need.`,
        emotion: "🧘‍♀️",
        timeAgo: "9 months ago",
        image: success3
    },
    {
        id: 10,
        title: "The Power of Honest Communication",
        preview: "We were speaking different languages without realizing it...",
        fullStory: `We were speaking different languages without realizing it. Blure's analysis of our text patterns revealed how miscommunication was eroding our relationship. What I saw as caring, she saw as controlling. What she meant as concern, I took as criticism.

        The app helped us understand our different communication styles and provided tools to bridge the gap. Though we ultimately decided to part ways, we did so with mutual understanding and respect.`,
        emotion: "💭",
        timeAgo: "5 months ago",
        image: success1
    },
    {
        id: 11,
        title: "Finding Strength in Letting Go",
        preview: "I was holding onto a relationship that wasn't serving either of us...",
        fullStory: `I was holding onto a relationship that wasn't serving either of us. Blure's analysis revealed patterns of codependency that I hadn't recognized. The app showed me how our relationship dynamics were affecting both our personal growth.

        Making the decision to end things was difficult, but Blure's guidance helped me understand that sometimes letting go is the most loving thing you can do. Six months later, we're both in a better place, growing individually. Sometimes the bravest thing you can do is choose yourself.`,
        emotion: "🦋",
        timeAgo: "6 months ago",
        image: success2,
    },
    {
        id: 12,
        title: "When AI Sees What You Can't",
        preview: "The patterns were there all along, but I couldn't see them...",
        fullStory: `The patterns were there all along, but I couldn't see them. Blure analyzed our messages and pointed out how our communication had shifted over the past year. The passive-aggressive undertones, the delayed responses, the emotional distance - it was all there in the data.

        What I appreciated most was how the app didn't just point out problems but offered actionable insights. Though we ultimately separated, the awareness I gained helped me maintain dignity and respect throughout the process. Now I know what healthy communication looks like.`,
        emotion: "🔍",
        timeAgo: "4 months ago",
        image: success3,
    },
    {
        id: 13,
        title: "Growth Through Understanding",
        preview: "Blure showed me it wasn't about blame...",
        fullStory: `Blure showed me it wasn't about blame, but about understanding. The AI analysis revealed how both our attachment styles were creating a cycle of misunderstandings. It wasn't that either of us was wrong - we just spoke different emotional languages.

        This insight changed everything. Even though we didn't stay together, I learned so much about myself and what I need in a relationship. The healing journey wasn't just about getting over someone, but about growing into a better version of myself.`,
        emotion: "🌱",
        timeAgo: "2 months ago",
        image: success1,
    },
    {
        id: 14,
        title: "Digital Wisdom in Modern Love",
        preview: "Technology helped me see what my heart couldn't accept...",
        fullStory: `Technology helped me see what my heart couldn't accept. Blure's analysis of our social media interactions and messaging patterns revealed a growing emotional distance that I'd been denying. The AI showed me how our online presence told a story of two people growing apart.

        The app's insights helped me approach the situation with data rather than just emotions. This objective perspective made it easier to have difficult but necessary conversations about our future. Sometimes, love needs a logical lens to see clearly.`,
        emotion: "💻",
        timeAgo: "2 months ago",
        image: success2
    },
    {
        id: 15,
        title: "Healing Through Data",
        preview: "The patterns in our communication told the real story...",
        fullStory: `The patterns in our communication told the real story. Blure analyzed years of our text messages and identified the exact moment our relationship started changing. The declining frequency of meaningful conversations, the shift in emotional language, it was all there in the data.

        This objective analysis helped me process the breakup not as a failure, but as a natural evolution. Understanding the 'why' made moving forward so much easier.`,
        emotion: "📊",
        timeAgo: "4 months ago",
        image: success1
    },
    {
        id: 16,
        title: "The AI's Unexpected Gift",
        preview: "I came looking for answers, but found something more valuable...",
        fullStory: `I came looking for answers, but found something more valuable - self-awareness. Blure's analysis didn't just show me why my relationship was ending; it revealed patterns in my behavior that had been sabotaging my connections for years.

        The app's insights about my conflict avoidance and fear of vulnerability were hard to accept but impossible to ignore. This journey of self-discovery has been more valuable than any relationship advice.`,
        emotion: "🎁",
        timeAgo: "3 months ago",
        image: success2
    },
    {
        id: 17,
        title: "Rediscovering Joy After Loss",
        preview: "The breakup felt like the end of my world...",
        fullStory: `The breakup felt like the end of my world, but Blure showed me it was just the end of a chapter. Through data-driven insights and personalized guidance, I learned to see my past relationship objectively.

        The app helped me understand that what I thought was love was actually dependency. Now I'm building a life filled with genuine connections and self-love.`,
        emotion: "🌈",
        timeAgo: "7 months ago",
        image: success3
    },
    {
        id: 18,
        title: "When Data Speaks Truth",
        preview: "Numbers don't lie, even when emotions cloud our judgment...",
        fullStory: `Numbers don't lie, even when emotions cloud our judgment. Blure's analysis of our message history revealed a steady decline in emotional intimacy that I had been refusing to see.

        The app's objective analysis helped me accept what my heart already knew but couldn't admit. Sometimes, the kindest thing we can do is let go.`,
        emotion: "📈",
        timeAgo: "5 months ago",
        image: success1
    },
    {
        id: 19,
        title: "The Path to Self-Discovery",
        preview: "Every ending is a chance for a new beginning...",
        fullStory: `Every ending is a chance for a new beginning. Blure didn't just help me understand why my relationship ended - it helped me understand myself. The AI's analysis of my communication patterns revealed deep-seated insecurities I hadn't recognized.

        Through guided reflection and personalized insights, I've learned to build healthier relationships, starting with the one with myself.`,
        emotion: "🧭",
        timeAgo: "8 months ago",
        image: success2
    },
    {
        id: 20,
        title: "Breaking the Cycle",
        preview: "I kept falling into the same relationship patterns...",
        fullStory: `I kept falling into the same relationship patterns until Blure helped me see why. The app's analysis of my past relationships revealed a consistent pattern of choosing partners who couldn't meet my emotional needs.

        Understanding these patterns was the first step to breaking them. Now I'm more conscious of my choices and better equipped to build healthy relationships.`,
        emotion: "⛓️",
        timeAgo: "6 months ago",
        image: success3
    },
    {
        id: 21,
        title: "The Power of Prediction",
        preview: "Blure saw the signs before I did...",
        fullStory: `Blure saw the signs before I did. The app's analysis predicted relationship challenges based on our communication patterns months before issues became apparent. At first, I was skeptical, but the insights were undeniable.

        Instead of waiting for things to fall apart, I was able to address issues early. Though we ultimately separated, the foresight helped make it a conscious, respectful decision.`,
        emotion: "🔮",
        timeAgo: "4 months ago",
        image: success1
    },
    {
        id: 22,
        title: "Love in the Digital Age",
        preview: "AI helped me understand my heart...",
        fullStory: `AI helped me understand my heart better than I could myself. Blure's analysis of our digital interactions revealed patterns I had been blind to - how our emotional connection fluctuated, how our communication styles clashed.

        The app's insights helped me approach relationships with more awareness and intentionality. Technology didn't just predict my breakup - it helped me grow from it.`,
        emotion: "💡",
        timeAgo: "3 months ago",
        image: success2
    },
    {
        id: 23,
        title: "Finding Clarity Through Technology",
        preview: "Sometimes you need an outside perspective...",
        fullStory: `Sometimes you need an outside perspective to see the truth. Blure provided that through its objective analysis of our relationship patterns. The app showed me how our emotional distance had been growing gradually over months.

        This clarity helped me make decisions based on facts rather than just feelings. It's amazing how technology can help us understand our most human experiences.`,
        emotion: "🔭",
        timeAgo: "5 months ago",
        image: success3
    },
    {
        id: 24,
        title: "The Science of Heartbreak",
        preview: "Understanding the 'why' made all the difference...",
        fullStory: `Understanding the 'why' made all the difference in my healing journey. Blure's scientific approach to analyzing relationships helped me see my breakup not as a failure, but as a natural outcome of incompatible patterns.

        The app's insights into our communication styles and emotional patterns helped me accept the end with grace and wisdom. Sometimes, the most loving choice is to let go.`,
        emotion: "🧪",
        timeAgo: "2 months ago",
        image: success1
    },
    {
        id: 25,
        title: "A New Chapter Begins",
        preview: "What seemed like an ending was actually a beginning...",
        fullStory: `What seemed like an ending was actually a beginning. Blure didn't just predict our breakup - it helped me understand why it was necessary for both of us. The app's analysis showed how our personal growth trajectories were diverging, and how holding on was preventing both of us from reaching our potential.

        Now, six months later, I can see how right the AI was. We're both thriving in our separate paths, and I'm grateful for the clarity that helped us make this decision with grace and understanding.`,
        emotion: "📖",
        timeAgo: "1 month ago",
        image: success3
    }
];