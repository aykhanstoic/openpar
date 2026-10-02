import type { Dict } from "./en";

/**
 * Azerbaijani copy.
 *
 * Typed as `Dict`, so this file will not compile if a key present in `en.ts`
 * is missing here. That is deliberate — it stops the Azerbaijani side of the
 * site quietly rotting behind the English one.
 *
 * NEEDS NATIVE REVIEW before launch. The translation is complete and
 * idiomatic, but EYP-specific vocabulary (Ümumi Yığıncaq, qətnamə, komanda
 * qurma) should be checked against the terminology the committee already
 * uses with schools, so the website and the participant packs agree.
 */
export const az: Dict = {
  site: {
    name: "EYP Azerbaijan",
    tagline: "Azərbaycanda Avropa Gənclər Parlamenti",
    description:
      "EYP Azerbaijan — Avropa Gənclər Parlamentinin Azərbaycandakı Milli Komitəsidir. 14–28 yaş arası gənclər üçün debat sessiyaları keçirən, gənclər tərəfindən idarə olunan bitərəf təşkilat.",
  },

  nav: {
    home: "Ana səhifə",
    about: "Haqqımızda",
    whatIsEyp: "EYP nədir?",
    participate: "Necə qoşulmaq olar",
    sessions: "Sessiyalar",
    news: "Xəbərlər",
    alumni: "Məzunlar",
    partners: "Tərəfdaşlar",
    contact: "Əlaqə",
    privacy: "Məxfilik",
    legal: "Hüquqi bildiriş",
    menu: "Menyu",
    close: "Bağla",
    skipToContent: "Əsas məzmuna keç",
    switchLang: "English",
  },

  common: {
    readMore: "Ətraflı",
    seeAll: "Hamısına bax",
    apply: "Müraciət et",
    applyMembersPlatform: "Members Platform vasitəsilə müraciət et",
    applyGoogleForm: "Forma ilə müraciət et",
    applicationsClosed: "Müraciətlər bağlanıb",
    noneYet: "Hələ heç nə yoxdur.",
    backTo: "Geri",
    deadline: "Son tarix",
    venue: "Məkan",
    theme: "Mövzu",
    dates: "Tarixlər",
    email: "E-poçt",
    placeholderNotice: "Nümunə mətn",
    photoPlaceholder: "Foto — bura sessiya fotoları qoyulacaq",
  },

  status: {
    announced: "Elan olunub",
    "call-open": "Müraciətlər açıqdır",
    "call-closed": "Müraciətlər bağlanıb",
    completed: "Başa çatıb",
  },

  /* ------------------------------------------------------------------ home */
  home: {
    badge: "Avropa Gənclər Parlamentinin Milli Komitəsi",
    title: "Mübahisə etməyi öyrən —",
    titleAccent: "ciddi şəkildə.",
    lead:
      "Azərbaycanın hər yerindən gəncləri bir otağa yığırıq: qarşılarında çətin bir sual, onlarla razılaşmayan bir komitə və hamısının imzalaya biləcəyi bir sənəd hazırlamaq üçün iki gün. Partiya xətti yoxdur. Mükafat yoxdur. Yalnız arqument var.",
    ctaPrimary: "Necə qoşulmaq olar",
    ctaSecondary: "Sessiyada nə baş verir",

    nextSessionLabel: "Növbəti sessiya",
    nextSessionNone:
      "Hazırda elan olunmuş sessiya yoxdur. Poçt siyahısına yazılın — növbəti çağırışdan ilk siz xəbər tutacaqsınız.",

    whatEyebrow: "Üç cümlədə",
    whatTitle: "Avropa Gənclər Parlamenti nədir",
    whatBody1:
      "EYP 1987-ci ildə yaradılmış, hazırda təxminən 40 ölkədə fəaliyyət göstərən vətəndaş təhsili şəbəkəsidir. Gənclər tərəfindən gənclər üçün idarə olunur, siyasi mandatı və partiya mənsubiyyəti yoxdur.",
    whatBody2:
      "Sessiyada sizə bir mövzu verilir, bir komitəyə təyin olunursunuz və eyni materialı oxuyub fərqli nəticəyə gələn insanlarla yazılı qətnamə razılaşdırmalı olursunuz.",
    whatBody3:
      "İştirak edən hər kəs — sədrlər, təşkilatçılar, jurnalistlər — könüllüdür və onların əksəriyyəti bir vaxtlar deleqat olub.",
    whatCta: "Sessiya formatı barədə ətraflı",

    numbersEyebrow: "Rəqəmlərlə",
    numbersTitle: "Şəbəkədə yerimiz",
    numberCountriesValue: "~40",
    numberCountriesLabel: "EYP şəbəkəsindəki ölkə",
    numberFoundedValue: "1987",
    numberFoundedLabel: "EYP-nin yarandığı il",
    numberAgeValue: "14–28",
    numberAgeLabel: "İşlədiyimiz yaş aralığı",
    numberVolunteerValue: "100%",
    numberVolunteerLabel: "Könüllülər tərəfindən təşkil olunur",

    newsEyebrow: "Ən son",
    newsTitle: "Xəbərlər və sessiya hesabatları",

    galleryEyebrow: "Şəkillərdə",
    galleryTitle: "Sessiya necə görünür",
    galleryNote:
      "Hələlik yer tutucular. Buraxılış siyahısına əsasən real sessiyalardan 50–80 seçilmiş foto lazımdır — yetkinlik yaşına çatmayanların tanına bildiyi hər yerdə razılıqla.",

    routesEyebrow: "İki yol",
    routesTitle: "Hazırda harada olduğunuzdan başlayın",
    routeNewTitle: "Bu barədə heç nə eşitməmişəm",
    routeNewBody:
      "Formatdan başlayın. On dəqiqəlik oxu sizə bunun bir həftəsonunu sərf etməyə dəyər olub-olmadığını göstərəcək.",
    routeNewCta: "EYP nədir?",
    routeMemberTitle: "Üzv və ya məzunam",
    routeMemberBody:
      "Deleqat və rəsmi şəxs çağırışları, təlim mərhələləri və yaş həddini keçdikdən sonra təşkilata faydalı qalmağın yolları.",
    routeMemberCta: "Açıq çağırışlar",

    partnersEyebrow: "Dəstəkçilərimiz",
    partnersTitle: "Tərəfdaşlar",
  },

  /* --------------------------------------------------------------- what is */
  whatIsEyp: {
    title: "EYP nədir?",
    lead:
      "Format kifayət qədər qeyri-adidir və düzgün izah olunmağa dəyər. Bu səhifə hər şeyi əhatə edir: sessiya nədir, hər gün nə baş verir və kim nə edir.",

    formatEyebrow: "Format",
    formatTitle: "Sessiya üç mərhələdən ibarətdir — məhz bu ardıcıllıqla",
    formatNote:
      "Ardıcıllıq təsadüfi deyil. Hər mərhələ yalnız ondan əvvəlki baş tutduğu üçün işləyir.",

    phase1Name: "Komanda qurma",
    phase1Duration: "Birinci gün",
    phase1Body:
      "Hər hansı mövzu açılmazdan əvvəl bütöv bir gün oyunlar və çalışmalar. Sessiyanın ən ciddi olmayan hissəsi kimi görünür və məhz qalan hissənin işləməsinin səbəbidir: bir-birinin qarşısında pərt olmaqdan qorxmayan komitə iki gün sonra çox daha səmimi mübahisə edəcək.",

    phase2Name: "Komitə işi",
    phase2Duration: "İkinci və üçüncü gün",
    phase2Body:
      "Təxminən on iki nəfərdən ibarət komitəniz bir mövzu götürür və bir qətnamə hazırlayır. Onu araşdırır, mübahisə edir və hər bəndin bütün sessiya qarşısında ucadan oxunmağa davam gətirəcəyi formaya salırsınız. Təlim keçmiş sədr otağı idarə edir, lakin nəticəni müəyyən etmir.",

    phase3Name: "Ümumi Yığıncaq",
    phase3Duration: "Son gün",
    phase3Body:
      "Hər komitə öz qətnaməsini hamının qarşısında müdafiə edir. Müdafiə çıxışı, zaldan açıq debat, prosedur iradları, hücum çıxışı və səsvermə olur. Bəzən qətnamələr qəbul edilmir. Bu, məşğələnin uğursuzluğu deyil, tamamilə qanuni nəticədir.",

    rolesEyebrow: "Kim kimdir",
    rolesTitle: "Sessiyadakı rollar",
    rolesLead:
      "Deleqatlar ən böyük qrupdur, amma yeganə deyil. Bütün digər rolları könüllülər doldurur və demək olar ki, hamısı deleqat kimi başlayıb.",

    roleDelegateName: "Deleqat",
    roleDelegateBody:
      "Mövzunu araşdırır, komitədə müdafiə edir, qətnamənin yazılmasına kömək edir və Ümumi Yığıncaqda çıxış edirsiniz. Bu, giriş nöqtəsidir və əvvəlcədən təcrübə tələb etmir.",

    roleChairName: "Sədr",
    roleChairBody:
      "Bir komitəni idarə edir. Mövzu icmalını hazırlayır, debatı canlı saxlayır, həddindən artıq danışanları tarazlayır və susanları söhbətə cəlb edir — özü isə heç bir mövqe tutmur.",

    roleOrganiserName: "Təşkilatçı",
    roleOrganiserBody:
      "Sessiyanın özünü qurur: məkan, yerləşmə, yemək, cədvəl, büdcə, uşaqların təhlükəsizliyi. Yaxşı görüləndə gözə görünmür, görülməyəndə dərhal hiss olunur.",

    roleMediaName: "Media Komandası",
    roleMediaBody:
      "Sessiyanı gedişatda işıqlandıran və onu tənqid etməkdə sərbəst olan jurnalistlər, fotoqraflar və video redaktorlar. Sessiya nəşrini hazırlayır.",

    roleJuryName: "Münsiflər heyəti",
    roleJuryBody:
      "Seçim sessiyalarında komitə işini və Ümumi Yığıncağı müşahidə edən və Azərbaycanı beynəlxalq səviyyədə təmsil edəcək nümayəndə heyətini seçən qrup.",

    whoEyebrow: "Kimlər iştirak edə bilər",
    whoTitle: "İştirak şərtləri",
    whoBody:
      "EYP 14–28 yaş arası gənclərlə işləyir. Əksər sessiyalarda deleqat yerləri orta məktəb şagirdlərinə verilir; sədrlik, təşkilatçılıq və media rollarını isə adətən artıq deleqat kimi sessiyada iştirak etmiş insanlar tutur. Siyasət təhsili almağınız da, əvvəllər debat etməyiniz də tələb olunmur.",

    notEyebrow: "Aydın olmalıdır",
    notTitle: "Bu nə deyil",
    not1Title: "Mükafatlı yarış deyil",
    not1Body:
      "Seçim sessiyaları Beynəlxalq Sessiya üçün nümayəndə heyəti seçir, lakin kubok yoxdur və deleqatlar sıralanmır. Sessiyaların çoxunda ümumiyyətlə heç kim seçilmir.",
    not2Title: "Partiya siyasəti deyil",
    not2Body:
      "EYP-nin siyasi mandatı yoxdur və heç bir partiyanı dəstəkləmir. Mövqeyi ona görə müdafiə edirsiniz ki, onun üzərində düşünmüsünüz — təşkilat sizə onu verdiyi üçün yox.",
    not3Title: "Debat klubu deyil",
    not3Body:
      "Xal sistemi, cavab taymeri və qalib tərəf yoxdur. Nəticə çoxluğun səs verməyə hazır olduğu razılaşdırılmış sənəddir.",
  },

  /* ------------------------------------------------------------- about us */
  about: {
    title: "Haqqımızda",
    lead:
      "Könüllü təşkilat, idarəetmə strukturu və hər ikisini işlək saxlayan insanlar.",

    missionEyebrow: "Missiya",
    missionTitle: "Partiya xətti olmadan siyasi maarifləndirmə",
    missionBody1:
      "EYP Azerbaijan 14–28 yaş arası insanlara Avropa və beynəlxalq məsələləri müzakirə etmək üçün strukturlaşdırılmış məkan verir — komitə işi, yazılı qətnamələr, açıq debat və səsvermə vasitəsilə.",
    missionBody2:
      "Biz təbliğat qrupu deyilik və siyasi mandatımız yoxdur. Təklif etdiyimiz format sizi mövqeyinizi araşdırmağa, ona qarşı ən güclü etirazı dinləməyə və nə düşündüyünüzü açıq şəkildə bəyan etməyə məcbur edir.",
    missionBody3:
      "Keçirdiyimiz hər şey könüllülər tərəfindən təşkil olunur və onların çoxu deleqatlardan cəmi bir neçə yaş böyükdür. Bu, xərcə qənaət üsulu deyil. Məhz buna görə on altı yaşlı bir gənc üçün otaq qorxulu görünmür.",

    valuesEyebrow: "Sadiq olduğumuz prinsiplər",
    valuesTitle: "Dörd öhdəlik",
    value1Title: "Bitərəflik",
    value1Body:
      "Partiya mənsubiyyəti yoxdur, siyasi mandat yoxdur, müzakirə etdiyimiz mövzularda rəsmi mövqeyimiz yoxdur.",
    value2Title: "Gənclər tərəfindən idarə olunma",
    value2Body:
      "Gənc könüllülər tərəfindən planlaşdırılır, idarə olunur və həyata keçirilir; böyüklər rəhbər deyil, dəstək rolundadır.",
    value3Title: "Bakıdan kənara açıqlıq",
    value3Body:
      "Bacarıq ölkə üzrə bərabər paylanıb, imkan isə yox. Autriç sessiyaları məhz bu fərqi azaltmaq üçündür.",
    value4Title: "Hesabatlılıq",
    value4Body:
      "Seçilmiş İcraiyyə İdarə Heyəti, onu yoxlayan Nəzarət Şurası və dərc olunan maliyyə hesabatları.",

    historyEyebrow: "Tarixçə",
    historyTitle: "EYP Azerbaijan bu günə qədər",
    historyBody:
      "Milli Komitənin qısa tarixçəsi buraya yazılmalıdır: nə vaxt yaradılıb, beynəlxalq şəbəkə tərəfindən nə vaxt tanınıb və bu yolda hansı sessiyalar önəmli olub.",

    networkEyebrow: "Geniş şəbəkə",
    networkTitle: "Şəbəkədəki yerimiz",
    networkBody1:
      "Avropa Gənclər Parlamenti təxminən 40 ölkədə fəaliyyət göstərir. Hər Milli Komitə öz maliyyəsinə, proqramına və könüllülərinə cavabdeh olan müstəqil təşkilatdır və ümumi şəbəkə standartları çərçivəsində işləyir.",
    networkBody2:
      "Şəbəkəni Berlində Beynəlxalq Ofisə ev sahibliyi edən Schwarzkopf Fondu dəstəkləyir. Bu üzvlük deleqatlarımıza digər Milli Komitələrin sessiyalarına müraciət etmək imkanı verir və xarici deleqatları bizim sessiyalarımıza gətirir.",
    networkCta: "EYP International",

    governanceEyebrow: "İdarəetmə",
    governanceTitle: "Qərarlar necə qəbul olunur",
    governanceBody:
      "Üzvlər təşkilatı gündəlik idarə edən İcraiyyə İdarə Heyətini seçir. Nəzarət Şurası onun işini yoxlayır və üzvlərə hesabat verir. Nizamnamə və illik hesabatlar dərc olunur ki, hər ikisi onlara uyğun hərəkət etməyə görə məsuliyyət daşısın.",
    governanceExecCta: "İcraiyyə İdarə Heyəti",
    governanceSupCta: "Nəzarət Şurası",
    documentsTitle: "Sənədlər",
    documentsBody:
      "Nizamnamə, illik hesabatlar və maliyyə icmalları burada PDF şəklində dərc olunacaq.",
  },

  /* ----------------------------------------------------------------- board */
  boards: {
    executiveTitle: "İcraiyyə İdarə Heyəti",
    executiveLead:
      "Üzvlər tərəfindən seçilir; strategiya, maliyyə və illik proqrama cavabdehdir. İstənilən üzvünə birbaşa yaza bilərsiniz.",
    supervisoryTitle: "Nəzarət Şurası",
    supervisoryLead:
      "İcraiyyə İdarə Heyətindən müstəqildir. Onun qərarlarını və maliyyəsini nəzərdən keçirir və Ümumi Yığıncaqda üzvlərə hesabat verir.",
    emptyExecutive: "İcraiyyə İdarə Heyətinin üzvləri hələ dərc olunmayıb.",
    emptySupervisory: "Nəzarət Şurasının üzvləri hələ dərc olunmayıb.",
    termLabel: "Səlahiyyət müddəti",
  },

  /* ----------------------------------------------------------- participate */
  participate: {
    title: "Necə qoşulmaq olar",
    lead:
      "Bir neçə giriş yolu var və sonradan rolunuzu dəyişə bilərsiniz. Əksər insanlar deleqat kimi gəlir və növbəti sessiyanı təşkil etməklə davam edir.",

    stepsEyebrow: "Giriş yolu",
    stepsTitle: "Bizdən xəbərsiz olmaqdan Ümumi Yığıncaqda çıxış etməyə qədər",
    step1Title: "Formatı oxuyun",
    step1Body:
      "On dəqiqə. Bunun bir həftəsonunu sərf etməyə dəyər olub-olmadığını anlamaq üçün kifayətdir.",
    step2Title: "Açıq çağırışı gözləyin",
    step2Body:
      "Çağırışlar ildə bir neçə dəfə, dəqiq son tarixlə açılır. Poçt siyahısı onları qaçırmamağın etibarlı yoludur.",
    step3Title: "Yazılı müraciət edin",
    step3Body:
      "Qısa müraciət. Biz CV-yə deyil, marağa və mübahisəyə açıqlığa baxırıq.",
    step4Title: "Sessiyaya gəlin",
    step4Body:
      "Komanda qurma, komitə işi, Ümumi Yığıncaq. Üç-dörd gün, adətən yerləşmə ilə.",
    step5Title: "Digər tərəfdən qayıdın",
    step5Body:
      "Sədr, jurnalist və ya təşkilatçı kimi təlim keçin və növbəti qrup üçün bunu özünüz idarə edin.",

    audiencesEyebrow: "Kim olduğunuzdan asılı olaraq",
    audiencesTitle: "Öz yolunuzu tapın",

    studentTitle: "Şagirdlər və tələbələr (14–28)",
    studentBody:
      "Deleqat kimi müraciət edin. Debat təcrübəsi tələb olunmur — ilk dəfə gələnlərin çoxunda yoxdur və hər sessiyanın ilk günü məhz bunu həll etmək üçündür.",
    studentCta: "Açıq çağırışlara bax",

    schoolTitle: "Məktəblər və müəllimlər",
    schoolBody:
      "Şagirdləri milli sessiyaya namizəd göstərin və ya məktəbinizdə autriç sessiyası keçirin. Formatı və təlim keçmiş rəsmi şəxsləri biz gətiririk; sizdən otaq və cədvəldə vaxt tələb olunur.",
    schoolCta: "Bizimlə əlaqə saxlayın",

    parentTitle: "Valideynlər",
    parentBody:
      "Sessiyalarda yetkinlik yaşına çatmayanlar iştirak edir və çox vaxt yerləşmə ilə keçirilir. Nəzarət qaydaları, təhlükəsizlik üzrə məsul şəxs, razılıq formaları və fövqəladə hallar üzrə prosedurlar hər sessiyanın iştirakçı paketində göstərilir.",
    parentCta: "Sual verin",

    volunteerTitle: "Üzvlər və rəsmi şəxslər",
    volunteerBody:
      "Komitəyə sədrlik edin, sessiya nəşrini redaktə edin və ya logistikanı idarə edin. Təşkilat əslində burada qurulur və insanların əksəriyyəti ən çox burada öyrəndiyini deyir.",
    volunteerCta: "Rəsmi şəxs çağırışları",

    alumniTitle: "Məzunlar",
    alumniBody:
      "Yaş həddini keçmisiniz, amma faydalı olmaq imkanınızı yox. Mentorluq edin, təlim keçirin, münsiflər heyətində iştirak edin və ya maliyyə mənbələrinə çıxışda kömək edin.",
    alumniCta: "Məzunlar şəbəkəsi",

    faqEyebrow: "Müraciətdən əvvəl",
    faqTitle: "Ən çox verilən suallar",
    faq1Q: "Debat təcrübəm olmalıdırmı?",
    faq1A:
      "Xeyr, deleqatların çoxunda yoxdur. Hər sessiyanın ilk günü otaqda heç kimin bunu əvvəllər etmədiyi fərziyyəsi üzərində qurulub.",
    faq2Q: "Sessiyalar hansı dildə keçirilir?",
    faq2A:
      "İngilis dili EYP şəbəkəsinin iş dilidir, ona görə komitə işi və Ümumi Yığıncaq ingilis dilində aparılır. Başa düşülən olmaq kifayətdir — səlis danışmaq seçim meyarı deyil və müraciətləri bunun üçün oxumuruq.",
    faq3Q: "Xərci varmı?",
    faq3A:
      "Yerləşmə ilə keçirilən sessiyalarda adətən yaşayış və yeməyi əhatə edən iştirak haqqı olur. Maliyyə dəstəyi mövcuddur və onu istəmək müraciətinizin nəticəsinə təsir etmir.",
    faq4Q: "18 yaşım yoxdur. Valideynlərim nə bilməlidir?",
    faq4A:
      "Valideyn razılığı yazılı şəkildə tələb olunur. Sessiya başlamazdan əvvəl hər ikiniz nəzarət, yerləşmə, təhlükəsizlik üzrə məsul şəxs və fövqəladə hallar üzrə prosedurları əhatə edən iştirakçı paketi alacaqsınız.",
    faq5Q: "Members Platform nədir?",
    faq5A:
      "EYP sessiyalarının əksəriyyətinin deleqat müraciətlərini qəbul etmək üçün istifadə etdiyi şəbəkə sistemi. Autriç sessiyaları ondan istifadə edə bilmir, ona görə həmin müraciətlər ayrıca forma vasitəsilə aparılır — sessiyalar səhifəsində hansının tətbiq olunduğu həmişə göstərilir.",
  },

  /* -------------------------------------------------------------- sessions */
  sessions: {
    title: "Sessiyalar",
    lead:
      "Keçirdiyimiz bütün sessiyalar, əvvəlcə açıq çağırışlar. Autriç sessiyaları müraciətləri ayrıca forma ilə qəbul edir, çünki Members Platform onları emal edə bilmir.",
    upcomingTitle: "Qarşıdakı və açıq",
    pastTitle: "Keçmiş sessiyalar",
    emptyUpcoming: "Hazırda elan olunmuş sessiya yoxdur.",
    emptyPast: "Hələ keçmiş sessiya dərc olunmayıb.",
    outreachLabel: "Autriç sessiyası",
    outreachExplainer:
      "Autriç sessiyaları adi sessiya dövriyyəsindən kənarda — məktəblərdə və regionlarda keçirilir. Deleqatlar Members Platform vasitəsilə müraciət edə bilmədiyi üçün burada birbaşa formadan istifadə olunur.",
    detailBackLabel: "Bütün sessiyalar",
    aboutThisSession: "Bu sessiya haqqında",
    resolutions: "Qətnamələr kitabçası",
    types: {
      nsc: "Milli Seçim Konfransı",
      rsc: "Regional Seçim Konfransı",
      "members-weekend": "Üzvlərin həftəsonu",
      international: "Beynəlxalq tədbir",
      training: "Təlim",
      other: "Digər",
    },
  },

  /* ------------------------------------------------------------------ news */
  news: {
    title: "Xəbərlər",
    lead: "Sessiya hesabatları, açıq çağırışlar, üzv təqdimatları və elanlar.",
    empty: "Hələ yazı dərc olunmayıb.",
    relatedSession: "Əlaqəli sessiya",
    backLabel: "Bütün xəbərlər",
    publishedOn: "Dərc olunub",
    otherLanguageNote:
      "Bəzi yazılar yalnız bir dildə dərc olunur. Onlar burada yazıldıqları dildə göstərilir.",
  },

  /* ---------------------------------------------------------------- alumni */
  alumni: {
    title: "Məzunlar",
    lead:
      "29 yaşınız tamam olanda şəbəkə bitmir. Məzunlar sədrlik edir, təlim keçirir, maliyyə dəstəyi verir, məsləhət verir və EYP-ni heç eşitməmiş insanlara bizi tövsiyə edir.",
    waysEyebrow: "İştirak yolları",
    waysTitle: "Məzunlar burada əslində nə edir",
    way1Title: "Növbəti rəsmi şəxsləri hazırlayın",
    way1Body:
      "Deleqatlıqdan təşkilatçılığa keçən üzvlər üçün sədrlik və media təlimləri keçirin.",
    way2Title: "Münsiflər heyətində iştirak edin",
    way2Body:
      "Seçim sessiyalarında komitə işini müşahidə edin və beynəlxalq nümayəndə heyətinin seçilməsinə kömək edin.",
    way3Title: "Qapılar açın",
    way3Body:
      "Bizi məktəblərlə, maliyyə mənbələri ilə, səfirliklərlə və işəgötürənlərlə tanış edin. Məzunların gördüyü ən faydalı iş budur.",
    way4Title: "Təşkilatı dəstəkləyin",
    way4Body:
      "Dəstəkçi üzvlük və ianələr iştirak haqqını elə səviyyədə saxlayır ki, pul həlledici amil olmasın.",
    testimonialsTitle: "Onların dili ilə",
    testimonialsBody:
      "Məzunların adı, sessiyası və ili ilə birlikdə rəyləri burada dərc olunacaq.",
    ctaTitle: "Sessiyada olmusunuz?",
    ctaBody:
      "Harada olduğunuzu bizə bildirin. Doğru adamlardan doğru köməyi istəyə bilmək üçün reyestr aparırıq.",
    ctaButton: "Yenidən əlaqə saxlayın",
  },

  /* -------------------------------------------------------------- partners */
  partners: {
    title: "Tərəfdaşlar və dəstək",
    lead:
      "Sessiyalar xərc tələb edir: məkan, yemək, yerləşmə, başqa cür gələ bilməyəcək deleqatlar üçün yol xərci. İştirak haqqının aşağı qalmasının səbəbi tərəfdaşlardır.",
    currentTitle: "Mövcud tərəfdaşlar",
    currentEmpty: "Tərəfdaş təşkilatlar burada göstəriləcək.",
    supportEyebrow: "Bizimlə işləyin",
    supportTitle: "Tərəfdaşlıq necə görünür",
    support1Title: "Sessiyanı maliyyələşdirin",
    support1Body:
      "Regional və ya autriç sessiyasının xərclərini qarşılayın və bir neçə yüz şagirdə, müəllimə və valideynə çatın.",
    support2Title: "Bizə məkan verin",
    support2Body:
      "Bir həftəsonluq məkan və ya təlim üçün otaqlar çox vaxt bizim üçün nağd puldan daha dəyərlidir.",
    support3Title: "İştirakı dəstəkləyin",
    support3Body:
      "Başqa cür müraciət etməyəcək deleqatların iştirak haqqını ödəyin. Ünvanlı, ucuz və sponsorun edə biləcəyi ən təsirli iş.",
    support4Title: "Təcrübənizi paylaşın",
    support4Body:
      "Məruzəçilər, mövzu üzrə mütəxəssislər və könüllülərimiz üçün peşəkar təlimlər.",
    brochureTitle: "Tərəfdaşlıq broşürü",
    brochureBody:
      "Auditoriya, əhatə dairəsi və sponsorluq paketlərinin bir səhifəlik icmalı burada PDF şəklində əlçatan olacaq.",
    contactCta: "İdarə heyəti ilə danışın",
  },

  /* --------------------------------------------------------------- contact */
  contact: {
    title: "Əlaqə",
    lead:
      "Müraciət etmək, sessiya keçirmək, bizimlə tərəfdaşlıq və məlumatlarınızın necə saxlanması barədə suallar.",
    directTitle: "Birbaşa əlaqə",
    generalLabel: "Ümumi sorğular",
    schoolsLabel: "Məktəblər və autriç",
    boardLabel: "İcraiyyə İdarə Heyəti",
    pressLabel: "Mətbuat və media",
    privacyLabel: "Məlumatların qorunması",
    socialTitle: "Sosial şəbəkələr",
    socialBody:
      "Gündəlik elanların əksəriyyəti əvvəlcə Instagram-da, sonra burada yerləşdirilir.",
  },

  /* --------------------------------------------------------------- privacy */
  privacy: {
    title: "Məxfilik siyasəti",
    lead: "Nə toplayırıq, nə üçün və necə sildirə bilərsiniz.",
    warningTitle: "Bu siyasət hələ yazılmayıb",
    warningBody:
      "Aşağıdakı mətn real siyasətin ehtiva etməli olduğu bölmələri göstərən sxemdir. Hüquqi qüvvəsi yoxdur. Bu sayt yetkinlik yaşına çatmayanlardan məlumat toplayacağı üçün, saytdakı hər hansı forma işə salınmazdan əvvəl real mətni hüquqşünas və ya məlumatların qorunması üzrə məsləhətçi yazmalıdır.",
    s1Title: "Biz kimik",
    s1Body:
      "Məlumatlara nəzarət edən təşkilatın qeydiyyat adı, hüquqi forması, qeydiyyat nömrəsi və ünvanı.",
    s2Title: "Nə toplayırıq",
    s2Body:
      "Xəbər bülleteni: ad və e-poçt. Sessiya müraciətləri: əlaqə məlumatları, doğum tarixi, məktəb, qida tələbləri, təhlükəsizlik üçün əhəmiyyətli tibbi məlumatlar və yetkinlik yaşına çatmayanlar üçün valideyn razılığı.",
    s3Title: "Nə üçün və hansı əsasla",
    s3Body:
      "Hər kateqoriya üçün məqsəd və qanuni əsas, həmçinin məlumatı verməkdən imtina etsəniz nə baş verəcəyi.",
    s4Title: "Nə qədər saxlayırıq",
    s4Body:
      "Hər kateqoriya üzrə saxlama müddəti və sessiya bitdikdən sonra avtomatik silinənlər.",
    s5Title: "Başqa kim görür",
    s5Body:
      "Məlumatın çatdığı emalçılar və şəbəkə sistemləri — Members Platform, poçt xidməti, forma alətləri və hostinq — və onların yerləşdiyi ölkələr.",
    s6Title: "Hüquqlarınız",
    s6Body:
      "Giriş, düzəliş, silinmə, etiraz və nəzarət orqanına şikayət etmə qaydası.",
    s7Title: "Uşaqlar",
    s7Body:
      "18 yaşdan kiçik iştirakçılar üçün əlavə qorunma tədbirləri, valideyn razılığının necə qeydə alınması və təhlükəsizlik üzrə məsul şəxs.",
    s8Title: "Əlaqə",
    s8Body: "Məlumatların qorunması sorğuları üçün ünvan və cavab müddəti.",
  },

  /* ----------------------------------------------------------------- legal */
  legal: {
    title: "Hüquqi bildiriş",
    lead: "Bu saytın sahibi kimdir və saytdan istifadənin şərtləri hansılardır.",
    warningTitle: "Bu bildiriş hələ yazılmayıb",
    warningBody:
      "Aşağıdakı mətn real hüquqi bildirişin ehtiva etməli olduğu bölmələri göstərən skeletdir. Hüquqi qüvvəsi yoxdur. Sayt açılmazdan əvvəl hüquqi şəxsin rekvizitləri və hüquqi yoxlama lazımdır.",
    sections: [
      { title: "Saytın sahibi", body: "Bu saytın sahibi olan təşkilatın hüquqi adı, hüquqi forması, qeydiyyat və vergi nömrəsi, hüquqi ünvanı və əlaqə e-poçtu." },
      { title: "Saytın məqsədi", body: "Saytın nə üçün mövcud olduğu: EYP Azerbaijan, sessiyalar və müraciət qaydası haqqında məlumat." },
      { title: "İstifadə şərtləri", body: "Saytdan istifadə qaydaları." },
      { title: "Əqli mülkiyyət", body: "Mətnlərin, loqotiplərin və fotoların kimə məxsus olduğu və nələrdən təkrar istifadə oluna biləcəyi." },
      { title: "Üçüncü tərəf keçidləri", body: "Saytın keçid verdiyi xarici saytlar, o cümlədən Members Platform və Google Forms üzrə məsuliyyət." },
      { title: "Məsuliyyət", body: "Təşkilatın saytın məzmununa və əlçatanlığına görə məsuliyyətinin hədləri." },
      { title: "Şəxsi məlumatlar", body: "Məxfilik siyasətinə istinad." },
      { title: "Kukilər", body: "Saytın hansı kukilərdən və analitikadan istifadə etdiyi, əgər istifadə edirsə." },
      { title: "Əlaqə və bildirişlər", body: "Təşkilatın istifadəçilərlə necə əlaqə saxladığı və abunəlikdən necə çıxmaq olar." },
      { title: "Tətbiq olunan hüquq və yurisdiksiya", body: "Hansı hüququn tətbiq olunduğu və hansı məhkəmələrin yurisdiksiyası." },
      { title: "Son yenilənmə", body: "Bildirişin sonuncu dəfə yenidən baxıldığı tarix." },
    ],
  },

  /* ---------------------------------------------------------------- footer */
  footer: {
    about:
      "Avropa Gənclər Parlamentinin Azərbaycandakı Milli Komitəsi. Bitərəf, gənclər tərəfindən idarə olunan və tamamilə könüllülərlə təşkil edilən təşkilat.",
    orgTitle: "Təşkilat",
    involvedTitle: "Qoşul",
    networkTitle: "Şəbəkə",
    legalTitle: "Hüquqi",
    newsletterTitle: "Növbəti çağırışı qaçırmayın",
    newsletterBody:
      "Çağırışlar tez açılır və tez bağlanır. Poçt siyahısı onların hamısının elan olunduğu yeganə yerdir.",
    newsletterPlaceholder: "siz@epoct.com",
    newsletterButton: "Abunə ol",
    newsletterConsent:
      "EYP Azerbaijan-dan e-poçt almağa razıyam və məxfilik siyasəti ilə tanış olmuşam.",
    newsletterDoubleOptIn:
      "Sizə təsdiq məktubu göndəriləcək. Ünvanınız yalnız oradakı linkə kliklədikdən sonra əlavə olunur.",
    newsletterDisabled: "Hələ poçt xidmətinə qoşulmayıb.",
    eypInternational: "EYP International",
    schwarzkopf: "Schwarzkopf Fondu",
    membersPlatform: "Members Platform",
    rights: "Bütün hüquqlar qorunur.",
    builtBy: "Könüllülər tərəfindən qurulub və dəstəklənir.",
  },
};
