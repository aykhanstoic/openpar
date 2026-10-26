/**
 * English copy — the source of truth for the translation shape.
 *
 * `Dict` is derived from this object, and `az.ts` is typed as `Dict`, so a
 * key added here that is missing there is a build error rather than a page
 * that silently falls back to English. Do not add `as const`: it would force
 * the Azerbaijani file to repeat the English string literals.
 */
export const en = {
  site: {
    name: "EYP Azerbaijan",
    tagline: "European Youth Parliament in Azerbaijan",
    description:
      "EYP Azerbaijan is the National Committee of the European Youth Parliament in Azerbaijan — a youth-run, non-partisan network running debate sessions for 14 to 28 year olds.",
  },

  nav: {
    home: "Home",
    about: "About Us",
    whatIsEyp: "What is EYP?",
    participate: "Get Involved",
    sessions: "Sessions",
    news: "News",
    alumni: "Alumni",
    partners: "Partners",
    contact: "Contact",
    privacy: "Privacy",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    switchLang: "Azərbaycanca",
  },

  common: {
    readMore: "Read more",
    seeAll: "See all",
    apply: "Apply",
    applyMembersPlatform: "Apply on the Members Platform",
    applyGoogleForm: "Apply via form",
    applicationsClosed: "Applications closed",
    noneYet: "Nothing here yet.",
    backTo: "Back to",
    deadline: "Deadline",
    venue: "Venue",
    theme: "Theme",
    dates: "Dates",
    email: "Email",
    placeholderNotice: "Placeholder",
    photoPlaceholder: "Photo — session photography goes here",
  },

  status: {
    announced: "Announced",
    "call-open": "Applications open",
    "call-closed": "Applications closed",
    completed: "Completed",
  },

  /* ------------------------------------------------------------------ home */
  home: {
    badge: "National Committee of the European Youth Parliament",
    title: "Learn to argue",
    titleAccent: "like it matters.",
    lead:
      "We put young people from across Azerbaijan in a room with a hard question, a committee that disagrees with them, and two days to produce something they can all sign. No party line. No prizes. Just the argument.",
    ctaPrimary: "How to take part",
    ctaSecondary: "What actually happens",

    nextSessionLabel: "Next session",
    nextSessionNone: "No session is currently announced. Join the mailing list and you will hear about the next call first.",

    whatEyebrow: "In three sentences",
    whatTitle: "What the European Youth Parliament is",
    whatBody1:
      "The EYP is a peer-to-peer civic education network founded in 1987 and now active in around 40 countries. It is run by young people, for young people, with no political mandate and no party affiliation.",
    whatBody2:
      "At a session you are given a topic, placed in a committee, and asked to negotiate a written resolution with people who read the same material and reached a different conclusion.",
    whatBody3:
      "Everyone involved — the chairpersons, the organisers, the journalists — is a volunteer, and most of them were delegates first.",
    whatCta: "The session format, explained",

    numbersEyebrow: "By the numbers",
    numbersTitle: "Where we sit in the network",
    numberCountriesValue: "~40",
    numberCountriesLabel: "Countries in the EYP network",
    numberFoundedValue: "1987",
    numberFoundedLabel: "Year the EYP was founded",
    numberAgeValue: "14–28",
    numberAgeLabel: "Age range we work with",
    numberVolunteerValue: "100%",
    numberVolunteerLabel: "Volunteer-organised",

    newsEyebrow: "Latest",
    newsTitle: "News and session recaps",

    galleryEyebrow: "In pictures",
    galleryTitle: "What a session looks like",
    galleryNote:
      "Placeholders for now. The launch checklist calls for 50–80 curated photos from real sessions, with consent wherever minors are identifiable.",

    routesEyebrow: "Two ways in",
    routesTitle: "Start where you actually are",
    routeNewTitle: "I have never heard of this",
    routeNewBody:
      "Start with the format. Ten minutes of reading will tell you whether a session sounds like something you want to spend a weekend on.",
    routeNewCta: "What is EYP?",
    routeMemberTitle: "I am a member or alumnus",
    routeMemberBody:
      "Open calls for delegates and officials, training rounds, and ways to stay useful to the organisation after you age out.",
    routeMemberCta: "Open calls",

    partnersEyebrow: "Supported by",
    partnersTitle: "Partners",
  },

  /* --------------------------------------------------------------- what is */
  whatIsEyp: {
    title: "What is EYP?",
    lead:
      "The format is unusual enough that it is worth explaining properly. This page is the whole thing — what a session is, what happens on each day, and who does what.",

    formatEyebrow: "The format",
    formatTitle: "A session is three phases, in this order",
    formatNote:
      "The order is not decorative. Each phase only works because the one before it happened.",

    phase1Name: "Teambuilding",
    phase1Duration: "Day one",
    phase1Body:
      "A full day of games and exercises before a single topic is opened. It looks like the least serious part of the session and it is the reason the rest works: a committee whose members are not afraid of embarrassing themselves in front of each other will argue far more honestly two days later.",

    phase2Name: "Committee Work",
    phase2Duration: "Days two and three",
    phase2Body:
      "Your committee of about twelve people takes one topic and produces one resolution. You research it, disagree about it, and negotiate wording until every clause can survive someone reading it aloud in front of the whole session. A trained chairperson runs the room but does not decide the outcome.",

    phase3Name: "General Assembly",
    phase3Duration: "Final day",
    phase3Body:
      "Every committee defends its resolution in front of everyone. There is a defence speech, open debate from the floor, points of order, an attack speech, and a vote. Resolutions fail sometimes. That is a legitimate outcome, not a failure of the exercise.",

    rolesEyebrow: "Who is who",
    rolesTitle: "Roles at a session",
    rolesLead:
      "Delegates are the largest group but not the only one. Every other role is filled by a volunteer, and almost all of them started as delegates.",

    roleDelegateName: "Delegate",
    roleDelegateBody:
      "You research a topic, argue it in committee, help write the resolution, and speak in the General Assembly. This is the entry point and requires no prior experience.",

    roleChairName: "Chairperson",
    roleChairBody:
      "Runs one committee. Prepares the topic overview, keeps the debate moving, manages the people who talk too much and draws out the ones who do not, and takes no position of their own.",

    roleOrganiserName: "Organiser",
    roleOrganiserBody:
      "Builds the session itself: venue, accommodation, food, timetable, budget, safeguarding. Invisible when done well, immediately obvious when not.",

    roleMediaName: "Media Team",
    roleMediaBody:
      "Journalists, photographers and video editors who cover the session as it happens, and who are free to be critical of it. Produces the session publication.",

    roleJuryName: "Jury",
    roleJuryBody:
      "At selection sessions, the panel that observes committee work and the General Assembly and selects the delegation that will represent Azerbaijan internationally.",

    whoEyebrow: "Eligibility",
    whoTitle: "Who can take part",
    whoBody:
      "The EYP works with people aged 14 to 28. Delegate places at most sessions go to secondary school students; chairing, organising and media roles are usually taken by people who have already attended a session as a delegate. You do not need to study politics, and you do not need to have debated before.",

    notEyebrow: "Worth being clear about",
    notTitle: "What it is not",
    not1Title: "Not a competition with a prize",
    not1Body:
      "Selection sessions do pick a delegation for an International Session, but there is no trophy and no ranking of delegates. Most sessions select nobody at all.",
    not2Title: "Not party politics",
    not2Body:
      "The EYP holds no political mandate and endorses no party. You argue a position because you have thought about it, not because an organisation handed it to you.",
    not3Title: "Not a debating club",
    not3Body:
      "There is no scoring, no rebuttal timer, and no winning side. The output is a negotiated document that a majority is willing to vote for.",
  },

  /* ------------------------------------------------------------- about us */
  about: {
    title: "About us",
    lead:
      "A volunteer organisation, a governance structure, and the people who keep both running.",

    missionEyebrow: "Mission",
    missionTitle: "Political education without a party line",
    missionBody1:
      "EYP Azerbaijan gives people aged 14 to 28 a structured place to argue about European and international affairs — through committee work, written resolutions, floor debate, and a vote.",
    missionBody2:
      "We are not an advocacy group and we hold no political mandate. What we offer is a format that makes you research a position, hear the strongest objection to it, and decide in public what you actually think.",
    missionBody3:
      "Everything we run is organised by volunteers, most of whom are only a few years older than the delegates in the room. That is not a cost-saving measure. It is the reason the room feels survivable to a sixteen-year-old.",

    valuesEyebrow: "What we hold to",
    valuesTitle: "Four commitments",
    value1Title: "Non-partisan",
    value1Body: "No party affiliation, no political mandate, no house position on the topics we debate.",
    value2Title: "Youth-run",
    value2Body: "Planned, chaired and delivered by young volunteers, with adults in support rather than in charge.",
    value3Title: "Open beyond Baku",
    value3Body: "Ability is spread evenly across the country and opportunity is not. Outreach sessions exist to narrow that gap.",
    value4Title: "Accountable",
    value4Body: "An elected Executive Board, a Supervisory Board that checks it, and published accounts.",

    glanceAgeValue: "14–28",
    glanceAgeLabel: "Age range of our delegates",
    glanceNetworkValue: "~40",
    glanceNetworkLabel: "Countries in the EYP network",
    glanceVolunteerValue: "100%",
    glanceVolunteerLabel: "Run by volunteers",

    boardEyebrow: "The people",
    boardTitle: "Who runs EYP Azerbaijan",
    boardBody:
      "Two elected bodies, both made up of volunteers. You can write to either of them directly.",
    boardFullPage: "Full page",

    historyEyebrow: "History",
    historyTitle: "EYP Azerbaijan so far",
    /** Milestones, oldest first. The History section stays hidden while this is empty. */
    milestones: [] as { year: string; title: string; body: string }[],

    networkEyebrow: "The wider network",
    networkTitle: "Where we sit",
    networkBody1:
      "The European Youth Parliament is active in around 40 countries. Each National Committee is an independent organisation responsible for its own finances, programme and volunteers, operating under shared network standards.",
    networkBody2:
      "The network is supported by the Schwarzkopf Foundation, which hosts the International Office in Berlin. Membership is what allows our delegates to apply to sessions hosted by other National Committees, and what brings delegates from abroad to ours.",
    networkCta: "EYP International",

    governanceEyebrow: "Governance",
    governanceTitle: "How decisions get made",
    governanceBody:
      "Members elect the Executive Board, which runs the organisation day to day. The Supervisory Board checks its work and reports back to the membership. Statutes and annual reports are published so that both can be held to them.",
    documentsTitle: "Documents",
    documentsBody: "Statutes, annual reports and financial summaries will be published here as downloadable PDFs.",
  },

  /* ----------------------------------------------------------------- board */
  boards: {
    executiveTitle: "Executive Board",
    executiveLead:
      "Elected by the membership, responsible for strategy, finances and the annual programme. You can write to any of them directly.",
    supervisoryTitle: "Supervisory Board",
    supervisoryLead:
      "Independent of the Executive Board. Reviews its decisions and finances, and reports to the membership at the General Assembly.",
    emptyExecutive: "Executive Board members have not been published yet.",
    emptySupervisory: "Supervisory Board members have not been published yet.",
    termLabel: "Term",
  },

  /* ----------------------------------------------------------- participate */
  participate: {
    title: "Get involved",
    lead:
      "There is more than one door in, and you can change roles later. Most people arrive as a delegate and end up running the next session.",

    stepsEyebrow: "The route in",
    stepsTitle: "From never having heard of us to standing in the General Assembly",
    step1Title: "Read the format",
    step1Body: "Ten minutes. Enough to know whether this is something you want to spend a weekend on.",
    step2Title: "Watch for an open call",
    step2Body: "Calls open a few times a year with a fixed deadline. The mailing list is the reliable way to catch them.",
    step3Title: "Apply in writing",
    step3Body: "A short application. We read for curiosity and willingness to be argued with, not for a CV.",
    step4Title: "Come to the session",
    step4Body: "Teambuilding, committee work, General Assembly. Three to four days, usually residential.",
    step5Title: "Come back on the other side",
    step5Body: "Train as a chairperson, journalist or organiser and run the thing for the next group.",

    audiencesEyebrow: "Depending on who you are",
    audiencesTitle: "Find your route",

    studentTitle: "Students (14–28)",
    studentBody:
      "Apply as a delegate. No debating background needed — most first-timers have none, and the first day of every session exists to fix exactly that.",
    studentCta: "See open calls",

    schoolTitle: "Schools and teachers",
    schoolBody:
      "Nominate students for a national session, or host an outreach session in your school. We bring the format and the trained officials; you provide a room and a timetable slot.",
    schoolCta: "Talk to us",

    parentTitle: "Parents",
    parentBody:
      "Sessions involve minors and are often residential. Supervision arrangements, the named safeguarding contact, consent forms and emergency procedures are set out in the participant pack for every session.",
    parentCta: "Ask a question",

    volunteerTitle: "Members and officials",
    volunteerBody:
      "Chair a committee, edit the session publication, or run logistics. This is where the organisation is actually built, and where most people say they learned the most.",
    volunteerCta: "Open officials' calls",

    alumniTitle: "Alumni",
    alumniBody:
      "Past the age range but not past being useful. Mentor, train, sit on a jury, or help us reach funders.",
    alumniCta: "Alumni network",

    faqEyebrow: "Before you apply",
    faqTitle: "Questions we get a lot",
    faq1Q: "Do I need debating experience?",
    faq1A:
      "No, and most delegates have none. The first day of every session is built on the assumption that nobody in the room has done this before.",
    faq2Q: "What language are sessions in?",
    faq2A:
      "English is the working language of the EYP network, so committee work and the General Assembly run in English. Being understandable is enough — fluency is not a selection criterion, and it is not what we are reading applications for.",
    faq3Q: "Does it cost anything?",
    faq3A:
      "Residential sessions usually carry a participation fee covering accommodation and meals. Financial support is available, and asking for it has no effect on whether your application succeeds.",
    faq4Q: "I am under 18. What do my parents need to know?",
    faq4A:
      "Written parental consent is required. You will both receive a participant pack covering supervision, accommodation, the named safeguarding contact and emergency procedures before the session starts.",
    faq5Q: "What is the Members Platform?",
    faq5A:
      "The network-wide system most EYP sessions use to take delegate applications. Outreach sessions cannot use it, so those applications run through a linked form instead — the sessions page always says which one applies.",
  },

  /* -------------------------------------------------------------- sessions */
  sessions: {
    title: "Sessions",
    lead:
      "Every session we run, open calls first. Outreach sessions take applications through a linked form because the Members Platform cannot process them.",
    upcomingTitle: "Upcoming and open",
    pastTitle: "Past sessions",
    emptyUpcoming: "No sessions are currently announced.",
    emptyPast: "No past sessions have been published yet.",
    outreachLabel: "Outreach session",
    outreachExplainer:
      "Outreach sessions are run in schools and regions outside the usual session circuit. Delegates cannot apply through the Members Platform, so these use a direct form.",
    detailBackLabel: "All sessions",
    aboutThisSession: "About this session",
  },

  /* ------------------------------------------------------------------ news */
  news: {
    title: "News",
    lead: "Session recaps, open calls, member spotlights and announcements.",
    empty: "No posts have been published yet.",
    relatedSession: "Related session",
    publishedOn: "Published",
    otherLanguageNote:
      "Some posts are published in one language only. Those are shown here in the language they were written in.",
  },

  /* ---------------------------------------------------------------- alumni */
  alumni: {
    title: "Alumni",
    lead:
      "The network does not expire when you turn 29. Alumni chair, train, fund, advise, and vouch for us to people who have never heard of the EYP.",
    waysEyebrow: "Ways to stay involved",
    waysTitle: "What alumni actually do here",
    way1Title: "Train the next officials",
    way1Body: "Run chairing and media training rounds for members moving from delegate to organiser.",
    way2Title: "Sit on a jury",
    way2Body: "Observe committee work at selection sessions and help choose the international delegation.",
    way3Title: "Open doors",
    way3Body: "Introduce us to schools, funders, embassies and employers. This is the single most useful thing alumni do.",
    way4Title: "Support the organisation",
    way4Body: "Supporting membership and donations keep participation fees low enough that money is not the deciding factor.",
    testimonialsTitle: "In their words",
    testimonialsBody: "Alumni testimonials with names, session and year will be published here.",
    ctaTitle: "Been to a session?",
    ctaBody: "Tell us where you ended up. We keep a register so we can ask the right people for the right favours.",
    ctaButton: "Get back in touch",
  },

  /* -------------------------------------------------------------- partners */
  partners: {
    title: "Partners and support",
    lead:
      "Sessions cost money: venues, food, accommodation, travel for delegates who could not otherwise come. Partners are the reason participation fees stay low.",
    currentTitle: "Current partners",
    currentEmpty: "Partner organisations will be listed here.",
    supportEyebrow: "Work with us",
    supportTitle: "What partnership looks like",
    support1Title: "Fund a session",
    support1Body: "Underwrite a regional or outreach session and reach several hundred students, teachers and parents.",
    support2Title: "Host us",
    support2Body: "A venue for a weekend, or rooms for a training round, is often worth more to us than cash.",
    support3Title: "Sponsor participation",
    support3Body: "Cover the fees of delegates who would otherwise not apply. Targeted, cheap, and the highest-impact thing a sponsor can do.",
    support4Title: "Offer expertise",
    support4Body: "Speakers, topic experts, and professional training for our volunteers.",
    brochureTitle: "Partnership brochure",
    brochureBody: "A one-page summary of audience, reach and sponsorship tiers will be available here as a PDF.",
    contactCta: "Talk to the board",
  },

  /* --------------------------------------------------------------- contact */
  contact: {
    title: "Contact",
    lead:
      "Questions about applying, hosting a session, partnering with us, or how we handle your data. Pick the address that fits and it reaches the right people first time.",
    directEyebrow: "Write to us",
    directTitle: "Who to write to",
    generalLabel: "General enquiries",
    generalBody: "Anything that does not fit below, or if you are not sure where to start.",
    schoolsLabel: "Schools and outreach",
    schoolsBody: "Hosting an outreach session, or bringing a group of students to one of ours.",
    boardLabel: "Executive Board",
    boardBody: "Partnerships, funding, and anything that needs a decision from the board.",
    pressLabel: "Press and media",
    pressBody: "Interviews, photos from past sessions, and statements for publication.",
    privacyLabel: "Data protection",
    privacyBody: "Requests to see, correct or delete the personal data we hold about you.",
    socialTitle: "Social",
    socialBody: "Most day-to-day announcements go out on Instagram first, then here.",
    beforeTitle: "Before you write",
    beforeBody: "Most questions about taking part are already answered on these pages.",
    beforeWhat: "What a session actually involves",
    beforeParticipate: "How to apply and who can",
    beforeSessions: "Upcoming sessions and open calls",
  },

  /* --------------------------------------------------------------- privacy */
  privacy: {
    title: "Privacy policy",
    lead: "What we collect, why, and how to make us delete it.",
    warningTitle: "This policy is not written yet",
    warningBody:
      "The text below is a skeleton showing the sections a real policy needs. It has no legal force. Because this site will collect data from minors, a lawyer or a data protection adviser must write the real version before any form on this site is switched on.",
    s1Title: "Who we are",
    s1Body: "The registered name, legal form, registration number and address of the organisation acting as data controller.",
    s2Title: "What we collect",
    s2Body:
      "Newsletter subscriptions: name and email. Session applications: contact details, date of birth, school, dietary requirements, medical information relevant to safeguarding, and parental consent for minors.",
    s3Title: "Why, and on what basis",
    s3Body: "The purpose and lawful basis for each category, and what happens if you decline to provide it.",
    s4Title: "How long we keep it",
    s4Body: "A retention period per category, and what is deleted automatically after a session ends.",
    s5Title: "Who else sees it",
    s5Body:
      "Processors and network systems the data reaches — the Members Platform, the mailing provider, form tooling and hosting — and where those are located.",
    s6Title: "Your rights",
    s6Body: "Access, correction, deletion, objection, and how to complain to the supervisory authority.",
    s7Title: "Children",
    s7Body:
      "Additional protections for participants under 18, how parental consent is recorded, and the named safeguarding contact.",
    s8Title: "Contact",
    s8Body: "The address for data protection requests, and the response time.",
  },

  /* ---------------------------------------------------------------- footer */
  footer: {
    about:
      "The National Committee of the European Youth Parliament in Azerbaijan. Non-partisan, youth-run, and organised entirely by volunteers.",
    orgTitle: "Organisation",
    involvedTitle: "Get involved",
    networkTitle: "Network",
    legalTitle: "Legal",
    newsletterTitle: "Catch the next call",
    newsletterBody:
      "Calls open and close quickly. The mailing list is the only place every one of them is announced.",
    newsletterPlaceholder: "your@email.com",
    newsletterButton: "Subscribe",
    newsletterConsent: "I agree to receive emails from EYP Azerbaijan and have read the privacy policy.",
    newsletterDoubleOptIn:
      "You will receive a confirmation email. Your address is only added once you click the link in it.",
    newsletterDisabled: "Not connected to a mailing provider yet.",
    eypInternational: "EYP International",
    schwarzkopf: "Schwarzkopf Foundation",
    membersPlatform: "Members Platform",
    rights: "All rights reserved.",
    builtBy: "Built and maintained by volunteers.",
  },
};

export type Dict = typeof en;
