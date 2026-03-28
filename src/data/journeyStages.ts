import { JourneyStage, IDE_TOOLS } from '../types/journey';

export { IDE_TOOLS };
export type { IDETool } from '../types/journey';

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'trigger',
    label: 'Trigger',
    order: 1,
    isLoop: false,
    frictionIntensity: 2,
    summary: 'Developer encounters a pain point or hears about AI IDE tools for the first time.',
    insights: {
      painPoints: [
        {
          id: 'trigger-pp-1',
          title: 'Repetitive boilerplate slows velocity',
          description: 'Writing the same CRUD scaffolding, test stubs, and config files for the tenth time this month. The work is mechanical but still demands focus, leaving less mental bandwidth for actual problem-solving.',
        },
        {
          id: 'trigger-pp-2',
          title: 'Context switching between docs and editor',
          description: 'Constantly alt-tabbing between the editor, MDN, Stack Overflow, and internal wikis breaks flow state. Every lookup costs 5–10 minutes of re-orientation when returning to the code.',
        },
        {
          id: 'trigger-pp-3',
          title: 'Peer pressure without clear signal',
          description: 'Colleagues are talking about GitHub Copilot and Cursor in Slack, but there\'s no clear signal on which tool is worth the context-switch cost. FOMO is real but so is the risk of wasted onboarding time.',
        },
        {
          id: 'trigger-pp-4',
          title: 'Slow code review cycles',
          description: 'PRs sit in review queues for days. Reviewers flag the same style and pattern issues repeatedly — problems that feel like they should be caught earlier in the workflow.',
        },
      ],
      motivations: [
        {
          id: 'trigger-m-1',
          title: 'Reclaim deep work time',
          description: 'The developer wants to spend more time in flow — solving hard problems — and less time on mechanical tasks. AI tooling is framed as a way to compress the boring parts of the job.',
        },
        {
          id: 'trigger-m-2',
          title: 'Stay competitive in the job market',
          description: 'AI-assisted development is increasingly listed in job descriptions. Developers want to build fluency before it becomes a baseline expectation rather than a differentiator.',
        },
        {
          id: 'trigger-m-3',
          title: 'Curiosity about what the tools can actually do',
          description: 'Beyond productivity, there\'s genuine technical curiosity. Developers want to understand the underlying capability — what kinds of reasoning these models can and can\'t do in a coding context.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'trigger-mo-1',
          title: 'Meet developers where the pain is',
          description: 'Lead with the specific friction — boilerplate, context switching, slow reviews — rather than abstract productivity claims. Concrete pain resonates more than "10x developer" language.',
        },
        {
          id: 'trigger-mo-2',
          title: 'Peer credibility over brand voice',
          description: 'At the trigger stage, developer word-of-mouth and community posts carry more weight than official marketing. Amplify authentic developer stories and real-world use cases rather than polished ad copy.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'trigger-mt-1',
          title: 'Twitter/X developer threads',
          channelCategory: 'social',
          description: 'Developers share "I just tried X and it did Y" threads that go viral in technical circles. These organic posts — often about GitHub Copilot or Cursor — are the first exposure for many developers.',
        },
        {
          id: 'trigger-mt-2',
          title: 'Hacker News "Show HN" posts',
          channelCategory: 'community',
          description: 'HN threads about new AI coding tools generate hundreds of comments from skeptics and early adopters alike. The signal-to-noise ratio is high enough that developers trust it as a discovery channel.',
        },
        {
          id: 'trigger-mt-3',
          title: 'YouTube "I tried X for a week" videos',
          channelCategory: 'earned',
          description: 'Long-form developer YouTubers documenting their experience with Kiro, Cursor, or Claude Code over a real project. These videos surface in search results and recommendations for developers actively researching.',
        },
        {
          id: 'trigger-mt-4',
          title: 'Team Slack / Discord mentions',
          channelCategory: 'community',
          description: 'Internal team channels where a colleague shares a screenshot of Cline or GitHub Copilot completing a complex refactor. Peer endorsement in a trusted context is a powerful trigger.',
        },
      ],
    },
  },
  {
    id: 'evaluation-research',
    label: 'Evaluation & Research',
    order: 2,
    isLoop: false,
    frictionIntensity: 3,
    summary: 'Developer actively compares AI IDE tools, reading reviews, watching demos, and assessing fit for their stack.',
    insights: {
      painPoints: [
        {
          id: 'eval-pp-1',
          title: 'Too many tools, no clear winner',
          description: 'Kiro, Cursor, Claude Code, GitHub Copilot, Cline — each has a different model, pricing, and IDE integration story. Comparing them requires significant time investment with no guarantee of a clear answer.',
        },
        {
          id: 'eval-pp-2',
          title: 'Benchmark results don\'t reflect real workflows',
          description: 'Published benchmarks test toy problems. Developers need to know how a tool performs on their actual stack — a monorepo with legacy TypeScript, a Python ML pipeline, or a Go microservices architecture.',
        },
        {
          id: 'eval-pp-3',
          title: 'Pricing opacity and seat-license friction',
          description: 'Enterprise pricing for GitHub Copilot requires procurement approval. Individual plans for Cursor or Claude Code come out of pocket. The cost-benefit calculation is hard to make without hands-on time.',
        },
        {
          id: 'eval-pp-4',
          title: 'Privacy and data residency concerns',
          description: 'Sending proprietary code to a third-party model raises questions about data retention, training use, and compliance. Security-conscious developers need clear answers before evaluating seriously.',
        },
      ],
      motivations: [
        {
          id: 'eval-m-1',
          title: 'Find the tool that fits their specific stack',
          description: 'Developers aren\'t looking for the "best" tool in the abstract — they want the best tool for their language, framework, and workflow. Stack-specific fit is the primary evaluation criterion.',
        },
        {
          id: 'eval-m-2',
          title: 'Validate peer recommendations with evidence',
          description: 'A colleague\'s endorsement of Cursor or Cline is a starting point, not a conclusion. Developers want to verify claims with their own research before committing time to a trial.',
        },
        {
          id: 'eval-m-3',
          title: 'Understand the model quality differences',
          description: 'Developers want to understand which underlying model powers each tool — GPT-4o, Claude 3.5 Sonnet, Gemini — and what that means for code quality, context window, and reasoning capability.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'eval-mo-1',
          title: 'Stack-specific comparison content',
          description: 'Create comparison guides that speak to specific stacks: "Kiro vs Cursor for TypeScript monorepos" or "Claude Code vs GitHub Copilot for Python data science." Generic comparisons don\'t convert; specific ones do.',
        },
        {
          id: 'eval-mo-2',
          title: 'Transparent pricing and data handling',
          description: 'Proactively address the privacy and pricing questions developers are already asking. A clear, honest answer to "what happens to my code?" builds trust faster than any feature comparison.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'eval-mt-1',
          title: 'Reddit r/programming and r/MachineLearning threads',
          channelCategory: 'community',
          description: 'Developers post "which AI coding tool should I use?" threads and get detailed responses from practitioners. These threads rank well in search and serve as evergreen comparison resources.',
        },
        {
          id: 'eval-mt-2',
          title: 'Official documentation and feature pages',
          channelCategory: 'owned',
          description: 'Developers visit the official docs for Kiro, Cursor, and GitHub Copilot to understand capabilities, pricing tiers, and IDE compatibility. Clear, scannable docs reduce evaluation friction significantly.',
        },
        {
          id: 'eval-mt-3',
          title: 'Developer conference talks and recordings',
          channelCategory: 'event',
          description: 'Re:Invent, KubeCon, and PyCon sessions on AI-assisted development. Developers watch recordings to see real-world usage patterns from practitioners they respect.',
        },
        {
          id: 'eval-mt-4',
          title: 'GitHub repository stars and activity',
          channelCategory: 'earned',
          description: 'For open-source tools like Cline, GitHub star counts, commit frequency, and issue response times serve as proxy signals for tool quality and community health.',
        },
      ],
    },
  },
  {
    id: 'trial',
    label: 'Trial',
    order: 3,
    isLoop: false,
    frictionIntensity: 3,
    summary: 'Developer installs and uses an AI IDE tool on a real task for the first time, forming initial impressions.',
    insights: {
      painPoints: [
        {
          id: 'trial-pp-1',
          title: 'Onboarding friction kills momentum',
          description: 'Installing a VS Code extension is easy; configuring Kiro\'s agent settings, connecting a model API key, or setting up Cursor\'s codebase indexing takes longer than expected. First-run friction sets a negative tone.',
        },
        {
          id: 'trial-pp-2',
          title: 'Suggestions feel generic or wrong',
          description: 'Early completions from GitHub Copilot or Claude Code miss project-specific conventions — wrong naming patterns, outdated library versions, or suggestions that don\'t compile. The developer questions whether the tool is worth the effort.',
        },
        {
          id: 'trial-pp-3',
          title: 'Uncertainty about how to prompt effectively',
          description: 'The tool works, but the developer doesn\'t know how to get the best out of it. Vague prompts produce vague results. There\'s a learning curve to prompt engineering that isn\'t obvious from the marketing.',
        },
        {
          id: 'trial-pp-4',
          title: 'Trust deficit on generated code',
          description: 'Every suggestion requires manual review. The developer isn\'t sure which outputs to trust, leading to a slower workflow than expected — sometimes slower than writing the code manually.',
        },
      ],
      motivations: [
        {
          id: 'trial-m-1',
          title: 'Get a quick win to justify continued use',
          description: 'The developer wants to see the tool solve a real problem in the first session — not a toy example. A genuine time-save on a real task is the hook that drives continued engagement.',
        },
        {
          id: 'trial-m-2',
          title: 'Understand the tool\'s actual capability ceiling',
          description: 'Beyond the first win, developers want to probe the limits. What happens with a complex multi-file refactor? Can it reason about the full codebase context? These tests reveal whether the tool is a toy or a genuine workflow upgrade.',
        },
        {
          id: 'trial-m-3',
          title: 'Build confidence in the output quality',
          description: 'Developers want to develop a mental model of when to trust the tool and when to be skeptical. Calibrated trust — not blind acceptance — is the goal of the trial phase.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'trial-mo-1',
          title: 'Guided first-use experiences',
          description: 'In-product onboarding that walks developers through a meaningful first task — not a "hello world" but a real workflow scenario — dramatically improves trial-to-retention rates. Show the value before asking for commitment.',
        },
        {
          id: 'trial-mo-2',
          title: 'Prompt engineering tips at the right moment',
          description: 'Surface prompting best practices contextually — when the developer\'s first attempt produces a weak result. A well-timed tip ("try adding context about your project structure") turns a frustrating moment into a learning one.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'trial-mt-1',
          title: 'In-product onboarding tooltips and walkthroughs',
          channelCategory: 'in-product',
          description: 'Kiro\'s first-run experience, Cursor\'s codebase indexing setup wizard, or GitHub Copilot\'s VS Code extension welcome screen. These in-product moments are the highest-leverage touchpoints during trial.',
        },
        {
          id: 'trial-mt-2',
          title: 'Official "getting started" documentation',
          channelCategory: 'owned',
          description: 'Developers reach for the official docs when the tool doesn\'t behave as expected. Clear troubleshooting guides and quick-start tutorials reduce drop-off during the critical first session.',
        },
        {
          id: 'trial-mt-3',
          title: 'YouTube "first look" and tutorial videos',
          channelCategory: 'earned',
          description: 'Developers search for "how to use Cline" or "Kiro tutorial" during their first session. Video walkthroughs that show real project usage — not contrived demos — are the most trusted format.',
        },
        {
          id: 'trial-mt-4',
          title: 'Discord and Slack community support channels',
          channelCategory: 'community',
          description: 'When stuck during trial, developers turn to community channels. Active, responsive communities for tools like Cursor and Cline reduce churn by providing real-time help during the critical first-use window.',
        },
      ],
    },
  },
  {
    id: 'experimentation-loop',
    label: 'Experimentation Loop',
    order: 4,
    isLoop: true,
    frictionIntensity: 4,
    summary: 'Developer cycles through multiple tools — Kiro, Cursor, Claude Code, Cline — comparing capabilities before committing to one.',
    insights: {
      painPoints: [
        {
          id: 'exploop-pp-1',
          title: 'Tool-switching overhead accumulates',
          description: 'Each tool has a different UX, keyboard shortcuts, and mental model. Switching between Cursor and Kiro mid-project means re-learning interaction patterns and losing the productivity gains from familiarity.',
        },
        {
          id: 'exploop-pp-2',
          title: 'Inconsistent results across tools for the same task',
          description: 'Running the same prompt through Claude Code and GitHub Copilot produces meaningfully different outputs. The developer can\'t tell if the difference is the model, the prompt, or the tool\'s context handling.',
        },
        {
          id: 'exploop-pp-3',
          title: 'Subscription costs stack up during evaluation',
          description: 'Paying for Cursor Pro, a Claude API key, and GitHub Copilot simultaneously while evaluating adds up. The financial pressure to pick one accelerates the decision before the developer feels ready.',
        },
        {
          id: 'exploop-pp-4',
          title: 'No objective framework for comparison',
          description: 'The developer lacks a structured way to evaluate tools. Comparisons are ad hoc — whichever tool happened to impress on the last task gets the mental edge, regardless of overall capability.',
        },
      ],
      motivations: [
        {
          id: 'exploop-m-1',
          title: 'Find the tool that fits their workflow, not just benchmarks',
          description: 'The developer wants a tool that integrates naturally into how they already work — their editor, their git workflow, their review process. Benchmark performance is secondary to workflow fit.',
        },
        {
          id: 'exploop-m-2',
          title: 'Avoid lock-in to the wrong tool',
          description: 'Committing to a tool means building habits, configuring settings, and potentially influencing team adoption. Getting it wrong is costly. The experimentation loop is a hedge against premature commitment.',
        },
        {
          id: 'exploop-m-3',
          title: 'Discover unexpected use cases',
          description: 'Each tool reveals new possibilities. Kiro\'s agent mode, Cline\'s autonomous task execution, or Cursor\'s multi-file edit capability might unlock workflows the developer hadn\'t considered. Exploration has intrinsic value.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'exploop-mo-1',
          title: 'Structured comparison frameworks',
          description: 'Provide developers with an honest, structured framework for evaluating AI IDE tools against their specific needs — language, team size, security requirements, budget. Objectivity builds trust and positions Kiro as a confident, transparent choice.',
        },
        {
          id: 'exploop-mo-2',
          title: 'Highlight Kiro\'s differentiating capabilities',
          description: 'During the experimentation loop, developers are actively looking for reasons to choose. Surface Kiro\'s unique strengths — spec-driven development, AWS integration, agent task management — in contexts where developers are comparing tools.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'exploop-mt-1',
          title: 'Side-by-side comparison blog posts',
          channelCategory: 'earned',
          description: 'Independent developer blogs comparing Kiro vs Cursor, or Claude Code vs GitHub Copilot on real projects. These posts rank well in search and are trusted because they come from practitioners with no vendor affiliation.',
        },
        {
          id: 'exploop-mt-2',
          title: 'In-product feature discovery prompts',
          channelCategory: 'in-product',
          description: 'Contextual prompts within Kiro that surface relevant capabilities when the developer is working on a task type where Kiro excels — e.g., "Try Kiro\'s spec mode for this feature" when a new file is created.',
        },
        {
          id: 'exploop-mt-3',
          title: 'Developer podcast episodes',
          channelCategory: 'earned',
          description: 'Podcasts like Syntax, Changelog, and Software Engineering Daily feature episodes on AI coding tools. Developers listen during commutes and form opinions based on practitioner conversations rather than vendor messaging.',
        },
        {
          id: 'exploop-mt-4',
          title: 'GitHub Discussions and issue trackers',
          channelCategory: 'community',
          description: 'Developers follow issue trackers for Cline and other open-source tools to understand known limitations and roadmap direction. This research informs the comparison and often surfaces deal-breakers.',
        },
      ],
    },
  },
  {
    id: 'commitment-signup',
    label: 'Commitment & Sign-Up',
    order: 5,
    isLoop: false,
    frictionIntensity: 2,
    summary: 'Developer selects a primary tool and completes sign-up, configuration, and team onboarding.',
    insights: {
      painPoints: [
        {
          id: 'commit-pp-1',
          title: 'Enterprise procurement slows individual adoption',
          description: 'A developer who wants to commit to Kiro or GitHub Copilot at work faces a procurement process — security review, legal sign-off, budget approval. The gap between personal conviction and organizational adoption can be months.',
        },
        {
          id: 'commit-pp-2',
          title: 'Team alignment is harder than individual adoption',
          description: 'Convincing a team to standardize on one tool requires buy-in from engineers with different preferences. The developer who championed Cursor may face resistance from teammates who prefer Claude Code or have no opinion.',
        },
        {
          id: 'commit-pp-3',
          title: 'Configuration complexity for team environments',
          description: 'Setting up shared prompt libraries, codebase context, and access controls for a team is significantly more complex than individual setup. Documentation gaps make this painful.',
        },
      ],
      motivations: [
        {
          id: 'commit-m-1',
          title: 'Standardize the team on a single workflow',
          description: 'A consistent toolchain reduces onboarding friction for new team members and enables shared prompt libraries, conventions, and institutional knowledge around AI-assisted development.',
        },
        {
          id: 'commit-m-2',
          title: 'Unlock advanced features behind a paid tier',
          description: 'Free tiers of GitHub Copilot and Cursor have meaningful limitations. Committing to a paid plan unlocks higher context windows, faster models, and team collaboration features that justify the cost.',
        },
        {
          id: 'commit-m-3',
          title: 'Establish a competitive advantage for the team',
          description: 'Engineering managers see AI tooling adoption as a team velocity multiplier. Committing to a tool and building team fluency is framed as a strategic investment, not just a developer convenience.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'commit-mo-1',
          title: 'Reduce procurement friction with enterprise-ready materials',
          description: 'Provide security documentation, compliance certifications, and ROI calculators that developers can share with procurement and engineering leadership. Remove the organizational barriers to commitment.',
        },
        {
          id: 'commit-mo-2',
          title: 'Team onboarding resources that accelerate adoption',
          description: 'Offer team setup guides, shared configuration templates, and onboarding checklists that make it easy for the champion developer to bring their team along. The easier the team transition, the faster the commitment.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'commit-mt-1',
          title: 'Pricing and enterprise plan pages',
          channelCategory: 'owned',
          description: 'Developers and engineering managers visit pricing pages to understand team plan options, seat limits, and enterprise features. Clear, transparent pricing with a visible ROI story accelerates the commitment decision.',
        },
        {
          id: 'commit-mt-2',
          title: 'Case studies and customer stories',
          channelCategory: 'owned',
          description: 'Engineering teams want to see how similar organizations adopted Kiro or GitHub Copilot. Case studies with concrete metrics — "reduced PR review time by 30%" — provide the social proof needed for organizational buy-in.',
        },
        {
          id: 'commit-mt-3',
          title: 'AWS re:Invent and developer summit sessions',
          channelCategory: 'event',
          description: 'Conference sessions where AWS engineers demonstrate Kiro in production workflows. These sessions reach engineering leaders who influence tool adoption decisions at the organizational level.',
        },
        {
          id: 'commit-mt-4',
          title: 'Email nurture sequences post-trial',
          channelCategory: 'owned',
          description: 'Targeted email sequences that follow up after a trial period with relevant use cases, team plan information, and limited-time offers. Timed to the natural decision window after a 14–30 day trial.',
        },
      ],
    },
  },
  {
    id: 'rapid-experimentation',
    label: 'Rapid Experimentation',
    order: 6,
    isLoop: false,
    frictionIntensity: 3,
    summary: 'Committed developer pushes the tool to its limits, building advanced workflows and discovering the edges of capability.',
    insights: {
      painPoints: [
        {
          id: 'rapid-pp-1',
          title: 'Context window limits break complex tasks',
          description: 'Large refactors, multi-file features, and codebase-wide changes hit context limits. Kiro and Claude Code handle this better than some competitors, but developers still encounter frustrating mid-task truncations.',
        },
        {
          id: 'rapid-pp-2',
          title: 'Agent mode reliability is inconsistent',
          description: 'Autonomous agent tasks — where the tool plans and executes multi-step workflows — sometimes go off-rails. The developer has to monitor closely, which partially defeats the purpose of automation.',
        },
        {
          id: 'rapid-pp-3',
          title: 'Integrating AI output into existing code review processes',
          description: 'AI-generated code needs review, but existing PR processes weren\'t designed for high-volume AI output. Teams struggle to maintain code quality standards without slowing down the velocity gains.',
        },
        {
          id: 'rapid-pp-4',
          title: 'Prompt library management becomes a maintenance burden',
          description: 'As the developer builds a library of effective prompts and system instructions, managing, versioning, and sharing them becomes its own overhead. There\'s no standard tooling for this yet.',
        },
      ],
      motivations: [
        {
          id: 'rapid-m-1',
          title: 'Maximize the ROI of the tool investment',
          description: 'Having committed to a paid plan, the developer is motivated to extract maximum value. This drives exploration of advanced features — agent mode, custom instructions, API integrations — that casual users never discover.',
        },
        {
          id: 'rapid-m-2',
          title: 'Build reusable AI-assisted workflows',
          description: 'The developer wants to codify their best prompts and workflows into reusable patterns — project templates, shared system prompts, CI/CD integrations — that multiply the value across the team.',
        },
        {
          id: 'rapid-m-3',
          title: 'Become the team\'s AI tooling expert',
          description: 'Early adopters who develop deep expertise in Kiro or Cursor become internal champions and knowledge resources. This role carries status and influence within the engineering organization.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'rapid-mo-1',
          title: 'Advanced use case content for power users',
          description: 'Create content specifically for developers who have moved past the basics — advanced agent workflows, custom model configurations, API integrations. This content rewards commitment and deepens tool fluency.',
        },
        {
          id: 'rapid-mo-2',
          title: 'Community recognition for power users',
          description: 'Highlight developers who have built impressive workflows with Kiro or GitHub Copilot. Community recognition programs, featured user stories, and beta access to new features reward the most engaged users.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'rapid-mt-1',
          title: 'Advanced documentation and API references',
          channelCategory: 'owned',
          description: 'Power users dive deep into Kiro\'s agent API, custom instruction syntax, and integration documentation. Comprehensive, accurate advanced docs are the primary resource at this stage.',
        },
        {
          id: 'rapid-mt-2',
          title: 'In-product feature announcements and changelogs',
          channelCategory: 'in-product',
          description: 'Developers at this stage pay close attention to changelogs and new feature announcements. In-product notifications about new Kiro capabilities or Claude Code model upgrades drive immediate experimentation.',
        },
        {
          id: 'rapid-mt-3',
          title: 'Developer community forums and Discord servers',
          channelCategory: 'community',
          description: 'Power users congregate in community spaces to share advanced techniques, debug edge cases, and request features. These communities are where the most sophisticated usage patterns emerge and spread.',
        },
        {
          id: 'rapid-mt-4',
          title: 'Technical blog posts and engineering blogs',
          channelCategory: 'earned',
          description: 'Developers write detailed technical posts about their advanced Kiro or Cursor workflows. These posts attract other power users and serve as organic marketing for the tool\'s advanced capabilities.',
        },
      ],
    },
  },
  {
    id: 'knowledge-loop',
    label: 'Knowledge Loop',
    order: 7,
    isLoop: true,
    frictionIntensity: 3,
    summary: 'Continuous cycle: knowledge gathering → problem solving with AI → advocacy and community showcasing → back to knowledge gathering.',
    insights: {
      painPoints: [
        {
          id: 'knowloop-pp-1',
          title: 'Keeping up with rapid model and tool updates',
          description: 'The AI tooling landscape moves fast. A workflow optimized for Claude 3.5 Sonnet may need rethinking when Claude 3.7 ships. Kiro, Cursor, and GitHub Copilot all update frequently, requiring continuous re-learning.',
        },
        {
          id: 'knowloop-pp-2',
          title: 'Knowledge sharing doesn\'t scale within teams',
          description: 'The developer has accumulated significant expertise in AI-assisted workflows, but sharing it with the team is ad hoc — a Slack message here, a lunch-and-learn there. There\'s no systematic way to transfer this knowledge.',
        },
        {
          id: 'knowloop-pp-3',
          title: 'Community contributions take time away from shipping',
          description: 'Writing blog posts, answering community questions, and contributing to open-source AI tooling projects (like Cline) is valuable but competes with delivery commitments. The developer struggles to balance advocacy with output.',
        },
        {
          id: 'knowloop-pp-4',
          title: 'Evaluating new tools without abandoning current investment',
          description: 'Even as a committed Kiro or Cursor user, the developer feels compelled to evaluate new entrants. Each evaluation cycle risks disrupting established workflows and creating tool-switching fatigue.',
        },
      ],
      motivations: [
        {
          id: 'knowloop-m-1',
          title: 'Stay at the frontier of AI-assisted development',
          description: 'The developer is intrinsically motivated to remain current. Being an early adopter of new capabilities — Kiro\'s next agent feature, a new Claude model, a new Cline integration — is part of their professional identity.',
        },
        {
          id: 'knowloop-m-2',
          title: 'Build reputation through community contribution',
          description: 'Sharing knowledge — through blog posts, conference talks, open-source contributions, or community answers — builds professional reputation and network. The knowledge loop is also a career development loop.',
        },
        {
          id: 'knowloop-m-3',
          title: 'Influence the tools they depend on',
          description: 'Active community members have disproportionate influence on product roadmaps. Filing detailed bug reports, participating in beta programs, and engaging with product teams at GitHub Copilot or Kiro gives the developer agency over their tools.',
        },
      ],
      messagingOpportunities: [
        {
          id: 'knowloop-mo-1',
          title: 'Champion programs and community recognition',
          description: 'Formalize the relationship with power users through champion programs — early access, co-marketing opportunities, direct product team access. These developers are the most credible voices in the community and the most effective marketing channel.',
        },
        {
          id: 'knowloop-mo-2',
          title: 'Content co-creation with community experts',
          description: 'Partner with developers who have built deep expertise in Kiro or Claude Code to co-create technical content — tutorials, case studies, conference talks. Authentic practitioner voices outperform brand-produced content at this stage.',
        },
      ],
      mediaTouchpoints: [
        {
          id: 'knowloop-mt-1',
          title: 'Developer conference speaking slots',
          channelCategory: 'event',
          description: 'Experienced AI tooling users speak at AWS re:Invent, GitHub Universe, and local meetups about their workflows. These talks reach developers at earlier journey stages and reinforce the speaker\'s expertise and the tool\'s credibility.',
        },
        {
          id: 'knowloop-mt-2',
          title: 'Technical newsletters and Substack publications',
          channelCategory: 'earned',
          description: 'Newsletters like TLDR, Bytes, and developer-focused Substacks feature advanced AI tooling content. Developers in the knowledge loop both consume and contribute to these publications.',
        },
        {
          id: 'knowloop-mt-3',
          title: 'Open-source project contributions and PRs',
          channelCategory: 'community',
          description: 'Contributing to Cline, writing Kiro extensions, or building integrations for GitHub Copilot. Open-source contribution is both a learning mechanism and a community signal of expertise.',
        },
        {
          id: 'knowloop-mt-4',
          title: 'Product beta and early access programs',
          channelCategory: 'in-product',
          description: 'Kiro\'s beta program, Cursor\'s early access features, and Claude Code preview releases. Developers in the knowledge loop actively seek early access to stay ahead of the curve and provide feedback that shapes the product.',
        },
      ],
    },
  },
];

export const STAGE_MAP: Record<string, JourneyStage> = Object.fromEntries(
  JOURNEY_STAGES.map((s) => [s.id, s])
);
