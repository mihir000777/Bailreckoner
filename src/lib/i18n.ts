export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr';

export interface Translations {
  appName: string;
  tagline: string;
  prisonerPortal: string;
  lawyerPortal: string;
  judgePortal: string;
  lawyerLoginBtn: string;
  judgeLoginBtn: string;
  signOutBtn: string;
  checkEligibility: string;
  legalRights: string;
  bnssHeadline: string;
  eligibleBadge: string;
  notEligibleBadge: string;
  conditionalBadge: string;
  daysServed: string;
  maxPunishment: string;
  downloadPdf: string;
  switchRole: string;

  // Hero & Landing
  statutoryUpdateBadge: string;
  heroHeading: string;
  heroHeadingAccent: string;
  scrollToReviewDockets: string;

  // Dossier Cards
  dossierCard1Title: string;
  dossierCard1Desc: string;
  dossierCard2Title: string;
  dossierCard2Desc: string;
  dossierCard3Title: string;
  dossierCard3Desc: string;

  // Statutory Lookup
  statutoryLookupTitle: string;
  statutoryLookupDesc: string;
  searchOffensePlaceholder: string;

  // Wizard translations
  step1Title: string;
  step2Title: string;
  step2Sub: string;
  filterByStatutes: string;
  proceedToRiskBtn: string;
  backBtn: string;
  step3Title: string;
  step3Sub: string;
  flightRiskHeader: string;
  societalSafetyHeader: string;
  permAddressLabel: string;
  passportSurrenderedLabel: string;
  priorConvictionsLabel: string;
  crimeViolenceLabel: string;
  computeBailBtn: string;
  step4Title: string;
  step5Title: string;
  prisonerNameLabel: string;
  firNumberLabel: string;
  policeStationLabel: string;
  custodyDateLabel: string;
  firstTimeOffenderLabel: string;
  calculateBtn: string;
  clearDraftBtn: string;
  demoCaseBtn: string;
  rightToLegalAidTitle: string;
  rightToLegalAidDesc: string;
  mandatoryThresholdTitle: string;
  mandatoryThresholdDesc: string;
  reckonedVerdictTitle: string;
  copyLegalTextBtn: string;
  printCourtPdfBtn: string;
  resetCalculatorBtn: string;

  // Legal Aid & Lawyer Workspace
  publicLegalAidTab: string;
  lawyerWorkspaceTab: string;
  applyForLegalAidTitle: string;
  dlsaApplicationDesc: string;
  trackApplicationBtn: string;
  draftPetitionBuilderTitle: string;
  draftPetitionBuilderDesc: string;
  launchDraftBuilderBtn: string;
  // Legal Aid Portal Header & Tabs
  nalsaGovIndia: string;
  nalsaHelpline: string;
  nationalFreeLegalAidTitle: string;
  nationalFreeLegalAidSub: string;
  publicPortalBtn: string;
  advocatePortalBtn: string;
  publicCitizenAccess: string;
  freeLegalRepTitle: string;
  freeLegalRepSub: string;
  applyForFreeLawyerBtn: string;
  tabScreener: string;
  tabTracker: string;
  tabClinics: string;
  screenerTitle: string;
  screenerSub: string;
  freeMandateBadge: string;
  selectCategoryLabel: string;
  eligibleEntitledBadge: string;

  // Judge Portal
  judgePortalTitle: string;
  judgePortalDesc: string;
  batchScreenerBtn: string;
  orderRegistryBtn: string;
  totalUndertrials: string;
  eligibleForRelease: string;
  pendingReview: string;

  // Footer
  footerRegistryDivision: string;
  termsAndConditions: string;
  supportHelpdesk: string;
  copyrightNotice: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Bail Reckoner',
    tagline: 'Undertrial Bail Eligibility & Legal Aid Decision Engine (BNSS 2023 / CrPC)',
    prisonerPortal: 'Prisoner & Family Portal',
    lawyerPortal: 'Legal Aid Provider (Lawyer)',
    judgePortal: 'Judicial Authority (Judge)',
    lawyerLoginBtn: 'Lawyer Login',
    judgeLoginBtn: 'Judge Login',
    signOutBtn: 'Sign Out',
    checkEligibility: 'Check Bail Eligibility',
    legalRights: 'Your Legal Rights',
    bnssHeadline: 'BNSS 2023 Section 479 Half-Time Mandatory Bail Tracker',
    eligibleBadge: 'STATUTORILY ELIGIBLE FOR BAIL',
    notEligibleBadge: 'NOT MANDATORY YET',
    conditionalBadge: 'JUDICIAL DISCRETION BAIL',
    daysServed: 'Days Served in Custody',
    maxPunishment: 'Max Sentence Punishment',
    downloadPdf: 'Download Court Bail Application',
    switchRole: 'Select Active Role',

    statutoryUpdateBadge: 'Statutory Update BNSS/2026',
    heroHeading: 'Justice delayed is liberty',
    heroHeadingAccent: 'denied',
    scrollToReviewDockets: 'Scroll to review dockets',

    dossierCard1Title: 'Bail Eligibility Reckoner',
    dossierCard1Desc: 'Primary engine for calculating Section 479 eligibility under the new Bharatiya Nagarik Suraksha Sanhita.',
    dossierCard2Title: 'Legal Aid Lawyer',
    dossierCard2Desc: 'Connecting eligible undertrials to public defense councils immediately.',
    dossierCard3Title: 'Judge Authority',
    dossierCard3Desc: 'Automated review of magistrate orders against statutory timelines.',

    statutoryLookupTitle: 'IPC ↔ BNS 2023 Statutory Converter',
    statutoryLookupDesc: 'Real-time section mapping between Indian Penal Code (IPC) and Bharatiya Nyaya Sanhita (BNS).',
    searchOffensePlaceholder: 'Search offense or section (e.g. 420, 379, POCSO)...',

    step1Title: 'Step 1: Prisoner & Custody Details',
    step2Title: 'Offence Intake & 7 Special Statutes Filter',
    step2Sub: 'Select IPC / BNS charges and Special Acts (POCSO, SC/ST, IT Act, Cyber).',
    filterByStatutes: 'FILTER BY SIH SPECIAL STATUTES:',
    proceedToRiskBtn: 'Proceed to Risk Checklist →',
    backBtn: '← Back',
    step3Title: 'Risk Assessment Checklist',
    step3Sub: 'Multi-factor flight risk and societal safety check.',
    flightRiskHeader: 'Flight Risk Factors',
    societalSafetyHeader: 'Societal Safety',
    permAddressLabel: 'Permanent residential address verified in jurisdiction',
    passportSurrenderedLabel: 'Passport surrendered to investigating court',
    priorConvictionsLabel: 'Previous criminal convictions on record',
    crimeViolenceLabel: 'Offense involved physical violence or weapons',
    computeBailBtn: 'Compute Bail Eligibility →',
    step4Title: 'Step 4: Bail Eligibility Analysis (BNSS 479)',
    step5Title: 'Step 5: Court Bail Application Draft',
    prisonerNameLabel: 'Undertrial Prisoner Full Name',
    firNumberLabel: 'FIR Number',
    policeStationLabel: 'Police Station',
    custodyDateLabel: 'Custody Start Date (Arrest Date)',
    firstTimeOffenderLabel: 'Is Prisoner a First-Time Offender? (1/3rd Term Rule)',
    calculateBtn: 'Calculate Bail Eligibility Now',
    clearDraftBtn: 'Clear Draft',
    demoCaseBtn: 'Load Demo Case Data',
    rightToLegalAidTitle: 'Right to Free Legal Aid (Article 39A)',
    rightToLegalAidDesc: 'Every undertrial prisoner is entitled to free legal aid through District Legal Services Authority (DLSA).',
    mandatoryThresholdTitle: 'BNSS 479 Mandatory Bail Right',
    mandatoryThresholdDesc: 'If you have served 1/2 of max sentence (or 1/3rd for first-time offenders), mandatory bail applies.',
    reckonedVerdictTitle: 'Reckoned Verdict',
    copyLegalTextBtn: 'Copy Legal Text',
    printCourtPdfBtn: 'Print Official Court PDF',
    resetCalculatorBtn: 'Reset Calculator',

    publicLegalAidTab: 'Public Legal Aid Portal',
    lawyerWorkspaceTab: 'Advocate Workspace',
    applyForLegalAidTitle: 'Apply for Free Legal Aid',
    dlsaApplicationDesc: 'Submit a legal representation request directly to District Legal Services Authority (DLSA).',
    trackApplicationBtn: 'Track Application Status',
    draftPetitionBuilderTitle: 'BNSS §479 Bail Petition Builder',
    draftPetitionBuilderDesc: 'Draft high-court ready bail application for immediate filing with magistrates.',
    launchDraftBuilderBtn: 'Launch Draft Builder',

    nalsaGovIndia: 'Government of India • National Legal Services Authority (NALSA / DLSA)',
    nalsaHelpline: 'NALSA Helpline: 15100',
    nationalFreeLegalAidTitle: 'National Free Legal Aid System.',
    nationalFreeLegalAidSub: 'Article 39A Constitutional Mandate — Choose between the Public Citizen Portal for free legal defense applications or the Empanelled Advocate Workspace for legal petition drafting and client dockets.',
    publicPortalBtn: '1. Public Portal',
    advocatePortalBtn: '2. Advocate Portal',
    publicCitizenAccess: 'Public Citizen Access • Section 12 Legal Services Authorities Act',
    freeLegalRepTitle: 'Free Legal Representation for Eligible Undertrials & Families',
    freeLegalRepSub: 'Check eligibility, apply for an allotted DLSA lawyer, or track an existing application status.',
    applyForFreeLawyerBtn: '+ Apply for Free DLSA Lawyer',
    tabScreener: '01. Section 12 Eligibility Screener',
    tabTracker: '02. Live Application Tracker',
    tabClinics: '03. DLSA Clinic & Helpline Finder',
    screenerTitle: 'Free Legal Aid Entitlement Screener',
    screenerSub: 'Section 12 Legal Services Authorities Act, 1987',
    freeMandateBadge: '100% Free Public Defense Mandate',
    selectCategoryLabel: '1. Select Applicant Category *',
    eligibleEntitledBadge: 'ENTITLED TO FREE DLSA LEGAL DEFENSE COUNSEL',

    judgePortalTitle: 'Judicial Oversight Bench',
    judgePortalDesc: 'Automated real-time screening of undertrial detention records against BNSS 479 timelines.',
    batchScreenerBtn: 'Batch Jail Screener',
    orderRegistryBtn: 'Order Registry',
    totalUndertrials: 'Total Undertrials',
    eligibleForRelease: 'Statutorily Eligible',
    pendingReview: 'Pending Judicial Review',

    footerRegistryDivision: 'REGISTRY DIVISION • INDIAN LEGAL AID SYSTEM',
    termsAndConditions: 'Terms & Conditions',
    supportHelpdesk: 'Support & Helpdesk',
    copyrightNotice: 'Made with ❤️ NEXORA',
  },
  hi: {
    appName: 'जमानत गणक (Bail Reckoner)',
    tagline: 'विचाराधीन बंदी जमानत पात्रता और कानूनी सहायता निर्णय इंजन (BNSS 2023 / CrPC)',
    prisonerPortal: 'बंदी और परिवार पोर्टल',
    lawyerPortal: 'कानूनी सहायता प्रदाता (वकील)',
    judgePortal: 'न्यायिक प्राधिकरण (न्यायाधीश)',
    lawyerLoginBtn: 'वकील लॉगिन',
    judgeLoginBtn: 'न्यायाधीश लॉगिन',
    signOutBtn: 'साइन आउट',
    checkEligibility: 'जमानत पात्रता जांचें',
    legalRights: 'आपके कानूनी अधिकार',
    bnssHeadline: 'BNSS 2023 धारा 479 आधा समय अनिवार्य जमानत ट्रैकर',
    eligibleBadge: 'कानूनी रूप से जमानत के लिए पात्र',
    notEligibleBadge: 'अभी अनिवार्य नहीं',
    conditionalBadge: 'न्यायिक विवेक जमानत',
    daysServed: 'हिरासत में बिताए गए दिन',
    maxPunishment: 'अधिकतम सजा का प्रावधान',
    downloadPdf: 'अदालत जमानत आवेदन डाउनलोड करें',
    switchRole: 'सक्रिय भूमिका चुनें',

    statutoryUpdateBadge: 'वैधानिक अद्यतन BNSS 2023 / CrPC',
    heroHeading: 'विलंबित न्याय स्वतंत्रता से',
    heroHeadingAccent: 'वंचित करना है',
    scrollToReviewDockets: 'डॉक्यूमेंट समीक्षा के लिए नीचे स्क्रॉल करें',

    dossierCard1Title: 'जमानत पात्रता गणक',
    dossierCard1Desc: 'न्यूनतम बीएनएसएस 479 के तहत पात्रता की गणना का मुख्य इंजन।',
    dossierCard2Title: 'मुफ्त कानूनी सहायता वकील',
    dossierCard2Desc: 'पात्र विचाराधीन बंदियों को तुरंत सरकारी बचाव वकील से जोड़ना।',
    dossierCard3Title: 'न्यायिक प्राधिकरण',
    dossierCard3Desc: 'समयसीमा के विरुद्ध मजिस्ट्रेट आदेशों की स्वचालित समीक्षा।',

    statutoryLookupTitle: 'IPC ↔ BNS 2023 वैधानिक कनवर्टर',
    statutoryLookupDesc: 'भारतीय दंड संहिता (IPC) और भारतीय न्याय संहिता (BNS) के बीच रीयल-टाइम धारा मैपिंग।',
    searchOffensePlaceholder: 'अपराध या धारा खोजें (जैसे 420, 379, पॉक्सो)...',

    step1Title: 'चरण 1: बंदी और हिरासत विवरण',
    step2Title: 'अपराध अंतग्रहण और 7 विशेष कानून फ़िल्टर',
    step2Sub: 'IPC / BNS धाराओं और विशेष अधिनियमों (POCSO, SC/ST, IT Act, Cyber) का चयन करें।',
    filterByStatutes: 'विशेष कानूनों द्वारा फ़िल्टर करें:',
    proceedToRiskBtn: 'जोखिम चेकलिस्ट पर आगे बढ़ें →',
    backBtn: '← पीछे',
    step3Title: 'जोखिम मूल्यांकन चेकलिस्ट',
    step3Sub: 'पलायन जोखिम और सामाजिक सुरक्षा का बहु-कारक परीक्षण।',
    flightRiskHeader: 'पलायन जोखिम कारक',
    societalSafetyHeader: 'सामाजिक सुरक्षा',
    permAddressLabel: 'स्थानीय क्षेत्राधिकार में स्थायी आवासीय पता सत्यापित',
    passportSurrenderedLabel: 'जांच अदालत में पासपोर्ट जमा किया गया',
    priorConvictionsLabel: 'रिकॉर्ड पर पिछले आपराधिक दंड',
    crimeViolenceLabel: 'अपराध में शारीरिक हिंसा या हथियार शामिल थे',
    computeBailBtn: 'जमानत पात्रता की गणना करें →',
    step4Title: 'चरण 4: जमानत पात्रता विश्लेषण (BNSS 479)',
    step5Title: 'चरण 5: अदालत जमानत आवेदन प्रारूप',
    prisonerNameLabel: 'विचाराधीन बंदी का पूरा नाम',
    firNumberLabel: 'एफआईआर संख्या',
    policeStationLabel: 'थाना',
    custodyDateLabel: 'हिरासत प्रारंभ तिथि (गिरफ्तारी की तारीख)',
    firstTimeOffenderLabel: 'क्या बंदी पहली बार का अपराधी है? (1/3 अवधि नियम)',
    calculateBtn: 'अब जमानत पात्रता की गणना करें',
    clearDraftBtn: 'ड्राफ्ट हटाएं',
    demoCaseBtn: 'डेमो केस डेटा लोड करें',
    rightToLegalAidTitle: 'निःशुल्क कानूनी सहायता का अधिकार (अनुच्छेद 39A)',
    rightToLegalAidDesc: 'प्रत्येक विचाराधीन बंदी जिला कानूनी सेवा प्राधिकरण (DLSA) के माध्यम से मुफ्त कानूनी सहायता का हकदार है।',
    mandatoryThresholdTitle: 'BNSS 479 अनिवार्य जमानत अधिकार',
    mandatoryThresholdDesc: 'यदि आपने अधिकतम सजा का 1/2 (या पहली बार के अपराधियों के लिए 1/3) समय जेल में बिताया है, तो अनिवार्य जमानत लागू होती है।',
    reckonedVerdictTitle: 'अनुमानित निर्णय',
    copyLegalTextBtn: 'कानूनी पाठ कॉपी करें',
    printCourtPdfBtn: 'आधिकारिक कोर्ट पीडीएफ प्रिंट करें',
    resetCalculatorBtn: 'कैलकुलेटर रीसेट करें',

    publicLegalAidTab: 'सार्वजनिक कानूनी सहायता पोर्टल',
    lawyerWorkspaceTab: 'वकील कार्यस्थान',
    applyForLegalAidTitle: 'मुफ्त कानूनी सहायता के लिए आवेदन करें',
    dlsaApplicationDesc: 'जिला कानूनी सेवा प्राधिकरण (DLSA) को सीधे कानूनी प्रतिनिधित्व अनुरोध जमा करें।',
    trackApplicationBtn: 'आवेदन की स्थिति ट्रैक करें',
    draftPetitionBuilderTitle: 'BNSS §479 जमानत याचिका निर्माता',
    draftPetitionBuilderDesc: 'मजिस्ट्रेट के समक्ष तुरंत दाखिल करने के लिए अदालत-तैयार जमानत आवेदन तैयार करें।',
    launchDraftBuilderBtn: 'ड्राफ्ट बिल्डर लॉन्च करें',

    nalsaGovIndia: 'भारत सरकार • राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA / DLSA)',
    nalsaHelpline: 'NALSA हेल्पलाइन: 15100',
    nationalFreeLegalAidTitle: 'राष्ट्रीय निःशुल्क विधिक सहायता प्रणाली.',
    nationalFreeLegalAidSub: 'अनुच्छेद 39A का संवैधानिक जनादेश — मुफ्त कानूनी सहायता आवेदनों के लिए सार्वजनिक नागरिक पोर्टल या वकील कार्यस्थान चुनें।',
    publicPortalBtn: '1. सार्वजनिक पोर्टल',
    advocatePortalBtn: '2. वकील पोर्टल',
    publicCitizenAccess: 'सार्वजनिक नागरिक पहुंच • धारा 12 विधिक सेवा प्राधिकरण अधिनियम',
    freeLegalRepTitle: 'पात्र विचाराधीन बंदियों और परिवारों के लिए मुफ्त कानूनी प्रतिनिधित्व',
    freeLegalRepSub: 'पात्रता जांचें, आवंटित DLSA वकील के लिए आवेदन करें, या आवेदन स्थिति ट्रैक करें।',
    applyForFreeLawyerBtn: '+ मुफ्त DLSA वकील के लिए आवेदन करें',
    tabScreener: '01. धारा 12 पात्रता स्क्रीनर',
    tabTracker: '02. लाइव आवेदन ट्रैकर',
    tabClinics: '03. DLSA क्लिनिक और हेल्पलाइन खोजक',
    screenerTitle: 'मुफ्त कानूनी सहायता पात्रता स्क्रीनर',
    screenerSub: 'धारा 12 विधिक सेवा प्राधिकरण अधिनियम, 1987',
    freeMandateBadge: '100% मुफ्त सरकारी बचाव वकील जनादेश',
    selectCategoryLabel: '1. आवेदक श्रेणी चुनें *',
    eligibleEntitledBadge: 'मुफ्त DLSA सरकारी बचाव वकील के लिए पात्र',

    judgePortalTitle: 'न्यायिक निगरानी पीठ',
    judgePortalDesc: 'बीएनएसएस 479 समयसीमा के खिलाफ विचाराधीन हिरासत रिकॉर्ड की स्वचालित रीयल-टाइम जांच।',
    batchScreenerBtn: 'जेल जनगणना स्कैनर',
    orderRegistryBtn: 'आदेश रजिस्ट्री',
    totalUndertrials: 'कुल विचाराधीन बंदी',
    eligibleForRelease: 'कानूनी रूप से पात्र',
    pendingReview: 'न्यायिक समीक्षा लंबित',

    footerRegistryDivision: 'रजिस्ट्री प्रभाग • भारतीय कानूनी सहायता प्रणाली',
    termsAndConditions: 'नियम और शर्तें',
    supportHelpdesk: 'सहायता और हेल्पलाइन',
    copyrightNotice: 'नेक्सोरा द्वारा प्यार से बनाया गया NEXORA',
  },
  kn: {
    appName: 'ಜಾಮೀನು ಲೆಕ್ಕಾಚಾರಕ (Bail Reckoner)',
    tagline: 'ವಿಚಾರಣಾಧೀನ ಕೈದಿಗಳ ಜಾಮೀನು ಅರ್ಹತೆ ಮತ್ತು ಉಚಿತ ಕಾನೂನು ನೆರವು ವ್ಯವಸ್ಥೆ (BNSS 2023 / CrPC)',
    prisonerPortal: 'ಕೈದಿ ಮತ್ತು ಕುಟುಂಬ ಪೋರ್ಟಲ್',
    lawyerPortal: 'ಉಚಿತ ಕಾನೂನು ನೆರವು (ವಕೀಲರು)',
    judgePortal: 'ನ್ಯಾಯಾಂಗ ಪ್ರಾಧಿಕಾರ (ನ್ಯಾಯಾಧೀಶರು)',
    lawyerLoginBtn: 'ವಕೀಲರ ಲಾಗಿನ್',
    judgeLoginBtn: 'ನ್ಯಾಯಾಧೀಶರ ಲಾಗಿನ್',
    signOutBtn: 'ಸೈನ್ ಔಟ್',
    checkEligibility: 'ಜಾಮೀನು ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
    legalRights: 'ನಿಮ್ಮ ಕಾನೂನು ಹಕ್ಕುಗಳು',
    bnssHeadline: 'BNSS 2023 ಸೆಕ್ಷನ್ 479 ಕಡ್ಡಾಯ ಜಾಮೀನು ಟ್ರ್ಯಾಕರ್',
    eligibleBadge: 'ಕಾನೂನುಬದ್ಧವಾಗಿ ಜಾಮೀನಿಗೆ ಅರ್ಹರು',
    notEligibleBadge: 'ಇನ್ನೂ ಕಡ್ಡಾಯವಾಗಿಲ್ಲ',
    conditionalBadge: 'ನ್ಯಾಯಾಂಗ ವಿವೇಚನಾ ಜಾಮೀನು',
    daysServed: 'ಬಂಧನದಲ್ಲಿ ಕಳೆದ ದಿನಗಳು',
    maxPunishment: 'ಗರಿಷ್ಠ ಶಿಕ್ಷೆಯ ಅವಧಿ',
    downloadPdf: 'ನ್ಯಾಯಾಲಯದ ಜಾಮೀನು ಅರ್ಜಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    switchRole: 'ಸಕ್ರಿಯ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',

    statutoryUpdateBadge: 'ಶಾಸನಬದ್ಧ ನವೀಕರಣ BNSS 2023 / CrPC',
    heroHeading: 'ವಿಳಂಬಿತ ನ್ಯಾಯವು ಸ್ವಾತಂತ್ರ್ಯದ',
    heroHeadingAccent: 'ನಿರಾಕರಣೆ',
    scrollToReviewDockets: 'ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಕೆಳಗೆ ಸ್ಕ್ರೋಲ್ ಮಾಡಿ',

    dossierCard1Title: 'ಜಾಮೀನು ಅರ್ಹತಾ ಲೆಕ್ಕಾಚಾರಕ',
    dossierCard1Desc: 'ಹೊಸ ಭಾರತೀಯ ನಾಗರಿಕ ಸುರಕ್ಷಾ ಸಂಹಿತೆಯ ಸೆಕ್ಷನ್ 479 ಅಡಿಯಲ್ಲಿ ಅರ್ಹತೆಯನ್ನು ಲೆಕ್ಕಹಾಕುವ ಮುಖ್ಯ ವ್ಯವಸ್ಥೆ.',
    dossierCard2Title: 'ಉಚಿತ ಕಾನೂನು ನೆರವು ವಕೀಲರು',
    dossierCard2Desc: 'ಅರ್ಹ ವಿಚಾರಣಾಧೀನ ಕೈದಿಗಳನ್ನು ಸಾರ್ವಜನಿಕ ರಕ್ಷಣಾ ಮಂಡಳಿಗೆ ತಕ್ಷಣವೇ ಸಂಪರ್ಕಿಸುವುದು.',
    dossierCard3Title: 'ನ್ಯಾಯಾಂಗ ಪ್ರಾಧಿಕಾರ',
    dossierCard3Desc: 'ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಆದೇಶಗಳ ಶಾಸನಬದ್ಧ ಕಾಲಮಿತಿಗಳ ಸ್ವಯಂಚಾಲಿತ ಪರಿಶೀಲನೆ.',

    statutoryLookupTitle: 'IPC ↔ BNS 2023 ಶಾಸನಬದ್ಧ ಪರಿವರ್ತಕ',
    statutoryLookupDesc: 'ಹಳೆಯ ಭಾರತೀಯ ದಂಡ ಸಂಹಿತೆ (IPC) ಯಿಂದ ನೂತನ ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತೆ (BNS) ಗೆ ನೈಜ-ಸಮಯದ ವಿಭಾಗಗಳ ಹುಡುಕಾಟ.',
    searchOffensePlaceholder: 'ಅಪರಾಧ ಅಥವಾ ವಿಭಾಗವನ್ನು ಹುಡುಕಿ (ಉದಾ: 420, 379, POCSO)...',

    step1Title: 'ಹಂತ 1: ಕೈದಿ ಮತ್ತು ಬಂಧನದ ವಿವರಗಳು',
    step2Title: 'ಅಪರಾಧ ದಾಖಲಾತಿ ಮತ್ತು 7 ವಿಶೇಷ ಕಾಯಿದೆಗಳ ಫಿಲ್ಟರ್',
    step2Sub: 'IPC / BNS ಆರೋಪಗಳು ಮತ್ತು ವಿಶೇಷ ಕಾಯಿದೆಗಳನ್ನು (POCSO, SC/ST, IT Act, Cyber) ಆಯ್ಕೆಮಾಡಿ.',
    filterByStatutes: 'ವಿಶೇಷ ಕಾಯಿದೆಗಳ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ:',
    proceedToRiskBtn: 'ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಮುಂದುವರಿಯಿರಿ →',
    backBtn: '← ಹಿಂದೆ',
    step3Title: 'ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    step3Sub: 'ಪಲಾಯನ ಅಪಾಯ ಮತ್ತು ಸಮಾಜದ ಸುರಕ್ಷತೆಯ ಬಹು-ಅಂಶಗಳ ಪರಿಶೀಲನೆ.',
    flightRiskHeader: 'ಪಲಾಯನ ಅಪಾಯದ ಅಂಶಗಳು',
    societalSafetyHeader: 'ಸಮಾಜದ ಸುರಕ್ಷತೆಯ ಅಂಶಗಳು',
    permAddressLabel: 'ಸ್ಥಳೀಯ ನ್ಯಾಯಾಂಗ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಶಾಶ್ವತ ವಾಸಸ್ಥಳ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    passportSurrenderedLabel: 'ತನಿಖಾ ನ್ಯಾಯಾಲಯಕ್ಕೆ ಪಾಸ್‌ಪೋರ್ಟ್ ಒಪ್ಪಿಸಲಾಗಿದೆ',
    priorConvictionsLabel: 'ಹಿಂದಿನ ಕ್ರಿಮಿನಲ್ ಶಿಕ್ಷೆಯ ದಾಖಲೆಗಳಿವೆ',
    crimeViolenceLabel: 'ಅಪರಾಧವು ಹಿಂಸಾಚಾರ ಅಥವಾ ಆಯುಧಗಳನ್ನು ಒಳಗೊಂಡಿದೆ',
    computeBailBtn: 'ಜಾಮೀನು ಅರ್ಹತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ →',
    step4Title: 'ಹಂತ 4: ಜಾಮೀನು ಅರ್ಹತಾ ವಿಶ್ಲೇಷಣೆ (BNSS 479)',
    step5Title: 'ಹಂತ 5: ನ್ಯಾಯಾಲಯದ ಜಾಮೀನು ಅರ್ಜಿ ಕರಡು',
    prisonerNameLabel: 'ವಿಚಾರಣಾಧೀನ ಕೈದಿಯ ಪೂರ್ಣ ಹೆಸರು',
    firNumberLabel: 'ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆ (FIR No)',
    policeStationLabel: 'ಪೊಲೀಸ್ ಠಾಣೆ',
    custodyDateLabel: 'ಬಂಧನದ ಪ್ರಾರಂಭದ ದಿನಾಂಕ',
    firstTimeOffenderLabel: 'ಕೈದಿ ಮೊದಲ ಬಾರಿಗೆ ಅಪರಾಧ ಮಾಡಿದ್ದಾರೆಯೇ? (1/3rd ನಿಯಮ)',
    calculateBtn: 'ಈಗ ಜಾಮೀನು ಅರ್ಹತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ',
    clearDraftBtn: 'ಕರಡು ತೆರವುಗೊಳಿಸಿ',
    demoCaseBtn: 'ಮಾದರಿ ಪ್ರಕರಣದ ವಿವರ ಲೋಡ್ ಮಾಡಿ',
    rightToLegalAidTitle: 'ಉಚಿತ ಕಾನೂನು ನೆರವಿನ ಹಕ್ಕು (ವಿಧಿ 39A)',
    rightToLegalAidDesc: 'ಪ್ರತಿಯೊಬ್ಬ ವಿಚಾರಣಾಧೀನ ಕೈದಿಯೂ ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರದ (DLSA) ಮೂಲಕ ಉಚಿತ ಕಾನೂನು ನೆರವು ಪಡೆಯಲು ಅರ್ಹರಾಗಿರುತ್ತಾರೆ.',
    mandatoryThresholdTitle: 'BNSS 479 ಕಡ್ಡಾಯ ಜಾಮೀನು ಹಕ್ಕು',
    mandatoryThresholdDesc: 'ನೀವು ಗರಿಷ್ಠ ಶಿಕ್ಷೆಯ 1/2 ಅವಧಿಯನ್ನು (ಅಥವಾ ಮೊದಲ ಬಾರಿಯ ಅಪರಾಧಿಗಳಿಗೆ 1/3 ಭಾಗವನ್ನು) ಜೈಲಿನಲ್ಲಿ ಕಳೆದಿದ್ದರೆ, ಕಡ್ಡಾಯ ಜಾಮೀನು ಅನ್ವಯಿಸುತ್ತದೆ.',
    reckonedVerdictTitle: 'ಲೆಕ್ಕಹಾಕಿದ ತೀರ್ಪು',
    copyLegalTextBtn: 'ಕಾನೂನು ಪಠ್ಯವನ್ನು ನಕಲಿಸಿ',
    printCourtPdfBtn: 'ಅಧಿಕೃತ ನ್ಯಾಯಾಲಯದ PDF ಮುದ್ರಿಸಿ',
    resetCalculatorBtn: 'ಲೆಕ್ಕಾಚಾರಕವನ್ನು ಮರುಹೊಂದಿಸಿ',

    publicLegalAidTab: 'ಸಾರ್ವಜನಿಕ ಕಾನೂನು ನೆರವು ಪೋರ್ಟಲ್',
    lawyerWorkspaceTab: 'ವಕೀಲರ ಕಾರ್ಯಸ್ಥಳ',
    applyForLegalAidTitle: 'ಉಚಿತ ಕಾನೂನು ನೆರವಿಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    dlsaApplicationDesc: 'ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರಕ್ಕೆ (DLSA) ಕಾನೂನು ಪ್ರಾತಿನಿಧ್ಯಕ್ಕಾಗಿ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ.',
    trackApplicationBtn: 'ಅರ್ಜಿ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
    draftPetitionBuilderTitle: 'BNSS §479 ಜಾಮೀನು ಅರ್ಜಿ ನಿರ್ಮಕ',
    draftPetitionBuilderDesc: 'ಹೈಕೋರ್ಟ್ ಮತ್ತು ಸೆಷನ್ಸ್ ನ್ಯಾಯಾಲಯಕ್ಕೆ ಸಲ್ಲಿಸಲು ಸಿದ್ಧವಾಗಿರುವ ಜಾಮೀನು ಅರ್ಜಿಯನ್ನು ತಕ್ಷಣವೇ ಕರಡು ಮಾಡಿ.',
    launchDraftBuilderBtn: 'ಕರಡು ನಿರ್ಮಕವನ್ನು ಪ್ರಾರಂಭಿಸಿ',

    nalsaGovIndia: 'ಭಾರತ ಸರ್ಕಾರ • ರಾಷ್ಟ್ರೀಯ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ (NALSA / DLSA)',
    nalsaHelpline: 'NALSA ಸಹಾಯವಾಣಿ: 15100',
    nationalFreeLegalAidTitle: 'ರಾಷ್ಟ್ರೀಯ ಉಚಿತ ಕಾನೂನು ನೆರವು ವ್ಯವಸ್ಥೆ.',
    nationalFreeLegalAidSub: 'ಸಂವಿಧಾನದ ವಿಧಿ 39A ರ ಉಚಿತ ಕಾನೂನು ನೆರವಿನ ಹಕ್ಕು — ಸಾರ್ವಜನಿಕ ಪೋರ್ಟಲ್ ಅಥವಾ ವಕೀಲರ ಕಾರ್ಯಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    publicPortalBtn: '1. ಸಾರ್ವಜನಿಕ ಪೋರ್ಟಲ್',
    advocatePortalBtn: '2. ವಕೀಲರ ಪೋರ್ಟಲ್',
    publicCitizenAccess: 'ಸಾರ್ವಜನಿಕ ಪ್ರವೇಶ • ಸೆಕ್ಷನ್ 12 ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರಗಳ ಕಾಯಿದೆ',
    freeLegalRepTitle: 'ಅರ್ಹ ವಿಚಾರಣಾಧೀನ ಕೈದಿಗಳು ಮತ್ತು ಕುಟುಂಬಗಳಿಗೆ ಉಚಿತ ಕಾನೂನು ನೆರವು',
    freeLegalRepSub: 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ, ಉಚಿತ DLSA ವಕೀಲರಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಅಥವಾ ಅರ್ಜಿ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    applyForFreeLawyerBtn: '+ ಉಚಿತ DLSA ವಕೀಲರಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    tabScreener: '01. ಸೆಕ್ಷನ್ 12 ಅರ್ಹತಾ ಪರೀಕ್ಷಕ',
    tabTracker: '02. ನೈಜ-ಸಮಯದ ಅರ್ಜಿ ಟ್ರ್ಯಾಕರ್',
    tabClinics: '03. DLSA ಕ್ಲಿನಿಕ್ ಮತ್ತು ಸಹಾಯವಾಣಿ ಹುಡುಕಾಟ',
    screenerTitle: 'ಉಚಿತ ಕಾನೂನು ನೆರವು ಅರ್ಹತಾ ಪರಿಶೀಲಕ',
    screenerSub: 'ಸೆಕ್ಷನ್ 12 ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರಗಳ ಕಾಯಿದೆ, 1987',
    freeMandateBadge: '100% ಉಚಿತ ಸಾರ್ವಜನಿಕ ರಕ್ಷಣಾ ವಕೀಲರ ಹಕ್ಕು',
    selectCategoryLabel: '1. ಅರ್ಜಿದಾರರ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ *',
    eligibleEntitledBadge: 'ಉಚಿತ DLSA ಕಾನೂನು ರಕ್ಷಣಾ ವಕೀಲರಿಗೆ ಅರ್ಹರು',

    judgePortalTitle: 'ನ್ಯಾಯಾಂಗ ಮೇಲ್ವಿಚಾರಣಾ ಪೀಠ',
    judgePortalDesc: 'ವಿಚಾರಣಾಧೀನ ಕೈದಿಗಳ ಜಾಮೀನು ಅರ್ಹತೆಯನ್ನು ನೈಜ-ಸಮಯದಲ್ಲಿ ಪರಿಶೀಲಿಸುವ ಸ್ವಯಂಚಾಲಿತ ವ್ಯವಸ್ಥೆ.',
    batchScreenerBtn: 'ಜೈಲು ಗಣತಿ ಸ್ಕ್ಯಾನರ್',
    orderRegistryBtn: 'ಆದೇಶಗಳ ನೋಂದಣಿ',
    totalUndertrials: 'ಒಟ್ಟು ವಿಚಾರಣಾಧೀನ ಕೈದಿಗಳು',
    eligibleForRelease: 'ಬಿಡುಗಡೆಗೆ ಅರ್ಹರು',
    pendingReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',

    footerRegistryDivision: 'ನೋಂದಣಿ ವಿಭಾಗ • ಭಾರತೀಯ ಕಾನೂನು ನೆರವು ವ್ಯವಸ್ಥೆ',
    termsAndConditions: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
    supportHelpdesk: 'ಬೆಂಬಲ ಮತ್ತು ಸಹಾಯವಾಣಿ',
    copyrightNotice: 'ನೆಕ್ಸೊರಾ ಅವರಿಂದ ಪ್ರೀತಿಯಿಂದ ತಯಾರಿಸಲ್ಪಟ್ಟಿದೆ NEXORA',
  },
  ta: {
    appName: 'ஜாமீன் கணக்கீட்டாளர்',
    tagline: 'விசாரணை கைதி ஜாமீன் தகுதி மற்றும் சட்ட உதவி எஞ்சின் (BNSS 2023 / CrPC)',
    prisonerPortal: 'கைதி மற்றும் குடும்ப போர்டல்',
    lawyerPortal: 'சட்ட உதவி வழக்கறிஞர்',
    judgePortal: 'நீதித்துறை அதிகாரி',
    lawyerLoginBtn: 'வழக்கறிஞர் உள்நுழைவு',
    judgeLoginBtn: 'நீதிபதிகளின் உள்நுழைவு',
    signOutBtn: 'வெளியேறு',
    checkEligibility: 'ஜாமீன் தகுதியைச் சரிபார்க்கவும்',
    legalRights: 'உங்கள் சட்டபூர்வ உரிமைகள்',
    bnssHeadline: 'BNSS 2023 பிரிவு 479 கட்டாய ஜாமீன் கண்காணிப்பு',
    eligibleBadge: 'ஜாமீனுக்குச் சட்டப்பூர்வ தகுதியானவர்',
    notEligibleBadge: 'இன்னும் கட்டாயமில்லை',
    conditionalBadge: 'நீதிபதியின் பரிசீலனை ஜாமீன்',
    daysServed: 'காவலில் இருந்த நாட்கள்',
    maxPunishment: 'அதிகபட்ச தண்டனை காலம்',
    downloadPdf: 'நீதிமன்ற மனுவைப் பதிவிறக்கவும்',
    switchRole: 'பங்கைத் தேர்ந்தெடுக்கவும்',

    statutoryUpdateBadge: 'சட்ட திருத்தம் BNSS 2023 / CrPC',
    heroHeading: 'தாமதிக்கப்பட்ட நீதி',
    heroHeadingAccent: 'மறுக்கப்பட்ட நீதி',
    scrollToReviewDockets: 'ஆவணங்களைப் பார்க்க கீழே உருட்டவும்',

    dossierCard1Title: 'ஜாமீன் தகுதி கணக்கீட்டாளர்',
    dossierCard1Desc: 'புதிய பாரதிய நகரிக் ಸುರக்ஷா சன்ஹிதா பிரிவு 479 இன் கீழ் தகுதியைக் கணக்கிடும் முதன்மை எஞ்சின்.',
    dossierCard2Title: 'இலவச சட்ட உதவி வழக்கறிஞர்',
    dossierCard2Desc: 'தகுதியான விசாரணை கைதிகளை உடனடியாக அரசு வழக்கறிஞருடன் இணைக்கிறது.',
    dossierCard3Title: 'நீதித்துறை அதிகாரி',
    dossierCard3Desc: 'நீதிமன்ற உத்தரவுகளின் தானியங்கி ஆய்வு.',

    statutoryLookupTitle: 'IPC ↔ BNS 2023 சட்ட மாற்றி',
    statutoryLookupDesc: 'இந்திய தண்டனைச் சட்டம் (IPC) மற்றும் பாரதிய நியாய சன்ஹிதா (BNS) இடையே நேரலை பிரிவுகள் ஒப்பீடு.',
    searchOffensePlaceholder: 'குற்றம் அல்லது பிரிவைத் தேடுங்கள் (எ.கா. 420, 379, போக்சோ)...',

    step1Title: 'படி 1: கைதி மற்றும் காவல் விவரங்கள்',
    step2Title: 'குற்றங்கள் மற்றும் 7 சிறப்பு சட்டங்கள்',
    step2Sub: 'IPC / BNS குற்றங்கள் மற்றும் சிறப்பு சட்டங்களை (POCSO, SC/ST, IT Act) தேர்ந்தெடுக்கவும்.',
    filterByStatutes: 'சிறப்பு சட்டங்கள் மூலம் வடிகட்டவும்:',
    proceedToRiskBtn: 'ஆபத்து சரிபார்ப்பு பட்டியலுக்குச் செல்லவும் →',
    backBtn: '← பின்னால்',
    step3Title: 'ஆபத்து மதிப்பீட்டு பட்டியல்',
    step3Sub: 'தப்பிக்கும் அபாயம் மற்றும் சமூக பாதுகாப்பு சோதனை.',
    flightRiskHeader: 'தப்பிக்கும் அபாய காரணிகள்',
    societalSafetyHeader: 'சமூக பாதுகாப்பு',
    permAddressLabel: 'நிரந்தர குடியிருப்பு முகவரி சரிபார்க்கப்பட்டது',
    passportSurrenderedLabel: 'கடவுச்சீட்டு நீதிமன்றத்தில் ஒப்படைக்கப்பட்டது',
    priorConvictionsLabel: 'முந்தைய குற்றவியல் தண்டனை பதிவுகள்',
    crimeViolenceLabel: 'குற்றத்தில் வன்முறை அல்லது ஆயுதங்கள் சேர்க்கப்பட்டுள்ளன',
    computeBailBtn: 'ஜாமீன் தகுதியைக் கணக்கிடுங்கள் →',
    step4Title: 'படி 4: ஜாமீன் தகுதி பகுப்பாய்வு (BNSS 479)',
    step5Title: 'படி 5: நீதிமன்ற மனு வரைவு',
    prisonerNameLabel: 'கைதியின் முழுப் பெயர்',
    firNumberLabel: 'முதல் தகவல் அறிக்கை (FIR) எண்',
    policeStationLabel: 'காவல் நிலையம்',
    custodyDateLabel: 'கைது செய்யப்பட்ட தேதி',
    firstTimeOffenderLabel: 'முதல் முறை குற்றவாளியா? (1/3rd விதி)',
    calculateBtn: 'ஜாமீன் தகுதியை இப்போது கணக்கிடுங்கள்',
    clearDraftBtn: 'வரைவை அழி',
    demoCaseBtn: 'மாதிரித் தரவை ஏற்றவும்',
    rightToLegalAidTitle: 'இலவச சட்ட உதவி உரிமை (பிரிவு 39A)',
    rightToLegalAidDesc: 'ஒவ்வொரு விசாரணை கைதியும் மாவட்ட சட்ட சேவைகள் ஆணைக்குழு (DLSA) மூலம் இலவச சட்ட உதவி பெற தகுதியுடையவர்.',
    mandatoryThresholdTitle: 'BNSS 479 கட்டாய ஜாமீன் உரிமை',
    mandatoryThresholdDesc: 'அதிகபட்ச தண்டனையில் 1/2 பங்கு காலத்தை சிறையில் கழித்திருந்தால் கட்டாய ஜாமீன் பொருந்தும்.',
    reckonedVerdictTitle: 'கணக்கிடப்பட்ட தீர்ப்பு',
    copyLegalTextBtn: 'சட்ட உரையை நகலெடு',
    printCourtPdfBtn: 'அதிகாரப்பூர்வ நீதிமன்ற PDF அச்சிடுக',
    resetCalculatorBtn: 'கணக்கீட்டாளரை மீட்டமைக்கவும்',

    publicLegalAidTab: 'பொது சட்ட உதவி போர்டல்',
    lawyerWorkspaceTab: 'வழக்கறிஞர் பணிப்பகுதி',
    applyForLegalAidTitle: 'இலவச சட்ட உதவிக்கு விண்ணப்பிக்கவும்',
    dlsaApplicationDesc: 'மாவட்ட சட்ட சேவைகள் ஆணையத்திற்கு (DLSA) மனு சமர்ப்பிக்கவும்.',
    trackApplicationBtn: 'விண்ணப்ப நிலையை கண்காணிக்கவும்',
    draftPetitionBuilderTitle: 'BNSS §479 ஜாமீன் மனு உருவாக்குபவர்',
    draftPetitionBuilderDesc: 'நீதிமன்றத்தில் தாக்கல் செய்ய ஜாமீன் மனுவை உடனடியாக உருவாக்கவும்.',
    launchDraftBuilderBtn: 'மனு உருவாக்குபவரைத் தொடங்கவும்',

    nalsaGovIndia: 'இந்திய அரசு • தேசிய சட்ட சேவைகள் ஆணையம் (NALSA / DLSA)',
    nalsaHelpline: 'NALSA உதவி எண்: 15100',
    nationalFreeLegalAidTitle: 'தேசிய இலவச சட்ட உதவி அமைப்பு.',
    nationalFreeLegalAidSub: 'பிரிவு 39A அரசியல் அமைப்பு கட்டளை — பொது போர்டல் அல்லது வழக்கறிஞர் பணிப்பகுதியைத் தேர்ந்தெடுக்கவும்.',
    publicPortalBtn: '1. பொது போர்டல்',
    advocatePortalBtn: '2. வழக்கறிஞர் போர்டல்',
    publicCitizenAccess: 'பொது மக்கள் அணுகல் • பிரிவு 12 சட்ட சேவைகள் ஆணைக்குழு சட்டம்',
    freeLegalRepTitle: 'தகுதியான விசாரணை கைதிகள் & குடும்பங்களுக்கு இலவச சட்ட உதவி',
    freeLegalRepSub: 'தகுதியை சரிபார்க்கவும், இலவச DLSA வழக்கறிஞருக்கு விண்ணப்பிக்கவும் அல்லது நிலையை கண்காணிக்கவும்.',
    applyForFreeLawyerBtn: '+ இலவச DLSA வழக்கறிஞருக்கு விண்ணப்பிக்கவும்',
    tabScreener: '01. பிரிவு 12 தகுதி பரிசோதனையாளர்',
    tabTracker: '02. நேரலை விண்ணப்ப டிராக்கர்',
    tabClinics: '03. DLSA கிளினிக் & உதவி எண்',
    screenerTitle: 'இலவச சட்ட உதவி தகுதி பரிசோதனையாளர்',
    screenerSub: 'பிரிவு 12 சட்ட சேவைகள் ஆணைக்குழு சட்டம், 1987',
    freeMandateBadge: '100% இலவச அரசு வழக்கறிஞர் உரிமை',
    selectCategoryLabel: '1. விண்ணப்பதாரர் பிரிவைத் தேர்ந்தெடுக்கவும் *',
    eligibleEntitledBadge: 'இலவச DLSA அரசு வழக்கறிஞருக்குத் தகுதியானவர்',

    judgePortalTitle: 'நீதித்துறை கண்காணிப்பு அமர்வு',
    judgePortalDesc: 'விசாரணை கைதிகளின் ஜாமீன் தகுதியை உடனுக்குடன் ஆய்வு செய்யும் அமைப்பு.',
    batchScreenerBtn: 'சிறை கணக்கெடுப்பு ஸ்கேனர்',
    orderRegistryBtn: 'உத்தரவு பதிவேடு',
    totalUndertrials: 'மொத்த விசாரணை கைதிகள்',
    eligibleForRelease: 'விடுதலைக்குத் தகுதியானவர்கள்',
    pendingReview: 'பரிசீಲனையில் உள்ளது',

    footerRegistryDivision: 'பதிவுப் பிரிவு • இந்திய சட்ட உதவி அமைப்பு',
    termsAndConditions: 'விதிகள் மற்றும் நிபந்தனைகள்',
    supportHelpdesk: 'ஆதரவு மையம்',
    copyrightNotice: 'அன்புடன் உருவாக்கப்பட்டது NEXORA',
  },
  te: {
    appName: 'బెయిల్ గణకి',
    tagline: 'అండర్‌ట్రయల్ ఖైదీల బెయిల్ అర్హత & న్యాయ సహాయ వేదిక (BNSS 2023 / CrPC)',
    prisonerPortal: 'ఖైదీ & కుటుంబ పోర్టల్',
    lawyerPortal: 'న్యాయ సహాయ న్యాయవాది',
    judgePortal: 'న్యాయమూర్తి పోర్టల్',
    lawyerLoginBtn: 'న్యాయవాది లాగిన్',
    judgeLoginBtn: 'న్యాయమూర్తి లాగిన్',
    signOutBtn: 'సైన్ అవుట్',
    checkEligibility: 'బెయిల్ అర్హతను తనిఖీ చేయండి',
    legalRights: 'మీ చట్టపరమైన హక్కులు',
    bnssHeadline: 'BNSS 2023 సెక్షన్ 479 సగం సమయం నిర్బంధ బెయిల్ ట్రాకర్',
    eligibleBadge: 'చట్టబద్ధంగా బెయిల్‌కు అర్హులు',
    notEligibleBadge: 'ఇంకా నిర్బంధం కాదు',
    conditionalBadge: 'న్యాయ విచక్షణ బెయిల్',
    daysServed: 'కస్టడీలో గడిపిన రోజులు',
    maxPunishment: 'గరిష్ట శిక్ష పరిమితి',
    downloadPdf: 'కోర్టు బెయిల్ దరఖాస్తును డౌన్‌లోడ్ చేయండి',
    switchRole: 'మీ పాత్రను ఎంచుకోండి',

    statutoryUpdateBadge: 'చట్టబద్ధమైన నవీకరణ BNSS 2023 / CrPC',
    heroHeading: 'అలసత్వపు న్యాయం స్వేచ్ఛను',
    heroHeadingAccent: 'హరించడమే',
    scrollToReviewDockets: 'వివరాల కోసం క్రిందికి స్క్రోల్ చేయండి',

    dossierCard1Title: 'బెయిల్ అర్హత గణకి',
    dossierCard1Desc: 'భారతీయ నాగరిక్ సురక్ష సంహిత సెక్షన్ 479 కింద అర్హతను లెక్కించే ముఖ్య వేదిక.',
    dossierCard2Title: 'ఉచిత న్యాయ సహాయ న్యాయవాది',
    dossierCard2Desc: 'అర్హులైన ఖైదీలను తక్షణమే ప్రభుత్వ న్యాయవాదితో అనుసంధానించడం.',
    dossierCard3Title: 'న్యాయమూర్తి పోర్టల్',
    dossierCard3Desc: 'కోర్టు ఉత్తర్వుల పురోగతిని సమీక్షించే వ్యవస్థ.',

    statutoryLookupTitle: 'IPC ↔ BNS 2023 చట్ట మార్పిడి',
    statutoryLookupDesc: 'భారతీయ శిక్షా స్మృతి (IPC) మరియు భారతీయ న్యాయ సంహిత (BNS) సెక్షన్ల సరిపోలిక.',
    searchOffensePlaceholder: 'నేరం లేదా సెక్షన్‌ను శోధించండి (ఉదా. 420, 379, పోక్సో)...',

    step1Title: 'దశ 1: ఖైదీ మరియు కస్టడీ వివరాలు',
    step2Title: 'నేర నమోదు & 7 ప్రత్యేక చట్టాల ఫిల్టర్',
    step2Sub: 'IPC / BNS మోపబడిన నేరాలు మరియు ప్రత్యేక చట్టాలను (POCSO, SC/ST, IT Act) ఎంచుకోండి.',
    filterByStatutes: 'ప్రత్యేక చట్టాల ద్వారా ఫిల్టర్ చేయండి:',
    proceedToRiskBtn: 'రిస్క్ అసెస్మెంట్‌కు వెళ్లండి →',
    backBtn: '← వెనుకకు',
    step3Title: 'రిస్క్ అసెస్మెంట్ చెక్‌లిస్ట్',
    step3Sub: 'పారిపోయే ప్రమాదం మరియు సామాజిక భద్రతా తనిఖీ.',
    flightRiskHeader: 'పారిపోయే ప్రమాద అంశాలు',
    societalSafetyHeader: 'సామాజిక భద్రత',
    permAddressLabel: 'పరిధిలో స్థిర నివాస చిరునామా ధృవీకరించబడింది',
    passportSurrenderedLabel: 'కోర్టులో పాస్‌పోర్ట్ సమర్పించబడింది',
    priorConvictionsLabel: 'గత నేరశిక్ష రికార్డులు ఉన్నాయి',
    crimeViolenceLabel: 'నేరంలో తీవ్రమైన హింస లేదా ఆయుధాలు ఉన్నాయి',
    computeBailBtn: 'బెయిల్ అర్హతను లెక్కించండి →',
    step4Title: 'దశ 4: బెయిల్ అర్హత విశ్లేషణ (BNSS 479)',
    step5Title: 'దశ 5: కోర్టు బెయిల్ దరఖాస్తు ముసాయిదా',
    prisonerNameLabel: 'అండర్‌ట్రయల్ ఖైదీ పూర్తి పేరు',
    firNumberLabel: 'ఎఫ్‌ఐఆర్ సంఖ్య',
    policeStationLabel: 'పోలీస్ స్టేషన్',
    custodyDateLabel: 'అరెస్టు తేదీ',
    firstTimeOffenderLabel: 'మొదటిసారి నేరస్తుడా? (1/3rd నిబంధన)',
    calculateBtn: 'ఇప్పుడే బెయిల్ అర్హతను లెక్కించండి',
    clearDraftBtn: 'డ్రాఫ్ట్ తొలగించు',
    demoCaseBtn: 'డెమో డేటాను లోడ్ చేయండి',
    rightToLegalAidTitle: 'ఉచిత న్యాయ సహాయం పొందే హక్కు (ఆర్టికల్ 39A)',
    rightToLegalAidDesc: 'ప్రతి విచారణ ఖైదీ జిల్లా న్యాయ సేవాధికార సంస్థ (DLSA) ద్వారా ఉచిత న్యాయ సహాయం పొందవచ్చు.',
    mandatoryThresholdTitle: 'BNSS 479 నిర్బంధ బెయిల్ హక్కు',
    mandatoryThresholdDesc: 'మీరు గరిష్ట శిక్షలో 1/2 వంతు జైలులో పూర్తి చేసినట్లయితే నిర్బంధ బెయిల్ వర్తిస్తుంది.',
    reckonedVerdictTitle: 'అంచనా వేసిన తీర్పు',
    copyLegalTextBtn: 'లీగల్ టెక్స్ట్‌ను కాపీ చేయండి',
    printCourtPdfBtn: 'అధికారిక కోర్టు PDF ని ప్రింట్ చేయండి',
    resetCalculatorBtn: 'క్యా بی‌క్యూలేటర్‌ను రీసెట్ చేయండి',

    publicLegalAidTab: 'పబ్లిక్ లీగల్ ఎయిడ్ పోర్టల్',
    lawyerWorkspaceTab: 'న్యాయవాది వర్క్‌స్పేస్',
    applyForLegalAidTitle: 'ఉచిత న్యాయ సహాయం కోసం దరఖాస్తు చేసుకోండి',
    dlsaApplicationDesc: 'జిల్లా న్యాయ సేవాధికార సంస్థ (DLSA) కు నేరుగా దరఖాస్తు చేసుకోండి.',
    trackApplicationBtn: 'దరఖాస్తు స్థితిని తెలుసుకోండి',
    draftPetitionBuilderTitle: 'BNSS §479 బెయిల్ పిటిషన్ బల్డర్',
    draftPetitionBuilderDesc: 'కోర్టులో దాఖలు చేయడానికి సిద్ధంగా ఉన్న బెయిల్ పిటిషన్‌ను తక్షణమే రూపొందించండి.',
    launchDraftBuilderBtn: 'డ్రాఫ్ట్ బిల్డర్‌ను ప్రారంభించండి',

    nalsaGovIndia: 'భారత ప్రభుత్వం • జాతీయ న్యాయ సేవాధికార సంస్థ (NALSA / DLSA)',
    nalsaHelpline: 'NALSA హెల్ప్‌లైన్: 15100',
    nationalFreeLegalAidTitle: 'జాతీయ ఉచిత న్యాయ సహాయ వ్యవస్థ.',
    nationalFreeLegalAidSub: 'ఆర్టికల్ 39A రాజ్యాంగ నిబంధన — పబ్లిక్ పోర్టల్ లేదా లాయర్ వర్క్‌స్పేస్‌ను ఎంచుకోండి.',
    publicPortalBtn: '1. పబ్లిక్ పోర్టల్',
    advocatePortalBtn: '2. లాయర్ పోర్టల్',
    publicCitizenAccess: 'పబ్లిక్ పౌరుల ప్రవేశం • సెక్షన్ 12 న్యాయ సేవాధికార సంస్థల చట్టం',
    freeLegalRepTitle: 'అర్హులైన ఖైదీలు & కుటుంబాలకు ఉచిత న్యాయ ప్రాతినిధ్యం',
    freeLegalRepSub: 'అర్హతను తనిఖీ చేయండి, కేటాయించిన DLSA లాయర్ కోసం దరఖాస్తు చేయండి.',
    applyForFreeLawyerBtn: '+ ఉచిత DLSA లాయర్ కోసం దరఖాస్తు చేయండి',
    tabScreener: '01. సెక్షన్ 12 అర్హత స్క్రీనర్',
    tabTracker: '02. ప్రత్యక్ష దరఖాస్తు ట్రాకర్',
    tabClinics: '03. DLSA క్లినిక్ & హెల్ప్‌లైన్',
    screenerTitle: 'ఉచిత న్యాయ సహాయ అర్హత స్క్రీనర్',
    screenerSub: 'సెక్షన్ 12 న్యాయ సేవాధికార సంస్థల చట్టం, 1987',
    freeMandateBadge: '100% ఉచిత పబ్లిక్ లాయర్ హక్కు',
    selectCategoryLabel: '1. దరఖాస్తుదారు వర్గాన్ని ఎంచుకోండి *',
    eligibleEntitledBadge: 'ఉచిత DLSA లాయర్ పొందడానికి అర్హులు',

    judgePortalTitle: 'న్యాయమూర్తి పర్యవేక్షణ వేదిక',
    judgePortalDesc: 'ఖైదీల బెయిల్ అర్హతను ఎప్పటికప్పుడు సమీక్షించే వ్యవస్థ.',
    batchScreenerBtn: 'జైలు జనాభా స్కేనర్',
    orderRegistryBtn: 'ఆర్డర్ రిజిస్ట్రీ',
    totalUndertrials: 'మొత్తం విచారణ ఖైదీలు',
    eligibleForRelease: 'విడుదలకు అర్హులు',
    pendingReview: 'పరిశీలనలో ఉంది',

    footerRegistryDivision: 'రిజిస్ట్రీ విభాగం • భారతీయ న్యాయ సహాయ వ్యవస్థ',
    termsAndConditions: 'నిబంధనలు & షరతులు',
    supportHelpdesk: 'సహాయ కేంద్రం',
    copyrightNotice: 'ప్రేమతో రూపొందించబడింది NEXORA',
  },
  mr: {
    appName: 'जामीन गणक',
    tagline: 'कच्च्या कैद्यांची जामीन पात्रता आणि कायदेशीर मदत इंजिन (BNSS 2023 / CrPC)',
    prisonerPortal: 'कैदी व कुटुंब पोर्टल',
    lawyerPortal: 'कायदेशीर मदत वकील',
    judgePortal: 'न्यायाधीश प्राधिकरण',
    lawyerLoginBtn: 'वकील लॉगिन',
    judgeLoginBtn: 'न्यायाधीश लॉगिन',
    signOutBtn: 'साइन आउट',
    checkEligibility: 'जामीन पात्रता तपासा',
    legalRights: 'तुमचे कायदेशीर अधिकार',
    bnssHeadline: 'BNSS 2023 कलम 479 अर्धा वेळ अनिवार्य जामीन ट्रॅकर',
    eligibleBadge: 'कायदेशीररीत्या जामिनासाठी पात्र',
    notEligibleBadge: 'अद्याप अनिवार्य नाही',
    conditionalBadge: 'न्यायालयीन विवेक जामीन',
    daysServed: 'कस्टडीत घालवलेले दिवस',
    maxPunishment: 'कमाल शिक्षेची तरतूद',
    downloadPdf: 'कोर्ट जामीन अर्ज डाउनलोड करा',
    switchRole: 'भूमिका निवडा',

    statutoryUpdateBadge: 'वैधानिक अद्यतन BNSS 2023 / CrPC',
    heroHeading: 'विलंबित न्याय म्हणजे स्वातंत्र्य',
    heroHeadingAccent: 'नाकारणे',
    scrollToReviewDockets: 'डॉक्युमेंट पाहण्यासाठी खाली स्क्रोल करा',

    dossierCard1Title: 'जामीन पात्रता गणक',
    dossierCard1Desc: 'नवीन भारतीय नागरी सुरक्षा संहितेच्या कलम ४७९ अंतर्गत जामीन पात्रता मोजण्याचे मुख्य इंजिन.',
    dossierCard2Title: 'मोफत कायदेशीर मदत वकील',
    dossierCard2Desc: 'पात्र कच्च्या कैद्यांना त्वरित सरकारी बचाव वकिलांशी जोडणे.',
    dossierCard3Title: 'न्यायाधीश प्राधिकरण',
    dossierCard3Desc: 'मॅजिस्ट्रेट आदेशांचे स्वयंचलित पुनरावलोकन.',

    statutoryLookupTitle: 'IPC ↔ BNS 2023 वैधानिक कनवर्टर',
    statutoryLookupDesc: 'भारतीय दंड संहिता (IPC) आणि भारतीय न्याय संहिता (BNS) मधील कलमांचे थेट रूपांतर.',
    searchOffensePlaceholder: 'गुन्हा किंवा कलम शोधा (उदा. 420, 379, पोक्सो)...',

    step1Title: 'टप्पा १: कैदी आणि कस्टडी तपशील',
    step2Title: 'गुन्हा नोंद आणि ७ विशेष कायदे फिल्टर',
    step2Sub: 'IPC / BNS कलमे आणि विशेष कायदे (POCSO, SC/ST, IT Act) निवडा.',
    filterByStatutes: 'विशेष कायद्यांनुसार फिल्टर करा:',
    proceedToRiskBtn: 'जोखीम तपासणीवर पुढे जा →',
    backBtn: '← मागे',
    step3Title: 'जोखीम मूल्यांकन चेकलिस्ट',
    step3Sub: 'पळून जाण्याचा धोका आणि सामाजिक सुरक्षा तपासणी.',
    flightRiskHeader: 'पळून जाण्याच्या धोक्याचे घटक',
    societalSafetyHeader: 'सामाजिक सुरक्षा',
    permAddressLabel: 'स्थानिक अधिकारक्षेत्रात कायमस्वरूपी निवासी पत्ता पडताळला',
    passportSurrenderedLabel: 'तपास न्यायालयात पासपोर्ट जमा केला',
    priorConvictionsLabel: 'रेकॉर्डवर पूर्वीच्या गुन्हेगारी शिक्षा',
    crimeViolenceLabel: 'गुन्ह्यात शारीरिक हिंसाचार किंवा शस्त्रे समाविष्ट होती',
    computeBailBtn: 'जामीन पात्रता मोजा →',
    step4Title: 'टप्पा ४: जामीन पात्रता विश्लेषण (BNSS 479)',
    step5Title: 'टप्पा ५: कोर्ट जामीन अर्ज मसुदा',
    prisonerNameLabel: 'कच्च्या कैद्याचे पूर्ण नाव',
    firNumberLabel: 'एफआयआर क्रमांक',
    policeStationLabel: 'पोलीस ठाणे',
    custodyDateLabel: 'अटक झाल्याची तारीख',
    firstTimeOffenderLabel: 'कैदी पहिल्यांदाच गुन्हेगार आहे का? (१/३ कालावधी नियम)',
    calculateBtn: 'आत्ता जामीन पात्रता मोजा',
    clearDraftBtn: 'मसुदा हटवा',
    demoCaseBtn: 'डेमो डेटा लोड करा',
    rightToLegalAidTitle: 'मोफत कायदेशीर मदतीचा अधिकार (कलम ३९A)',
    rightToLegalAidDesc: 'प्रत्येक कच्चा कैदी जिल्हा कायदेशीर सेवा प्राधिकरणामार्फत (DLSA) मोफत कायदेशीर मदतीसाठी पात्र आहे.',
    mandatoryThresholdTitle: 'BNSS 479 अनिवार्य जामीन अधिकार',
    mandatoryThresholdDesc: 'तुम्ही कमाल शिक्षेपैकी १/२ वेळ तुरुंगात घालवला असल्यास, अनिवार्य जामीन लागू होतो.',
    reckonedVerdictTitle: 'गणित केलेला निकाल',
    copyLegalTextBtn: 'कायदेशीर मजकूर कॉपी करा',
    printCourtPdfBtn: 'कोर्ट पीडीएफ प्रिंट करा',
    resetCalculatorBtn: 'कॅल्क्युलेटर रीसेट करा',

    publicLegalAidTab: 'सार्वजनिक कायदेशीर मदत पोर्टल',
    lawyerWorkspaceTab: 'वकील कार्यस्थान',
    applyForLegalAidTitle: 'मोफत कायदेशीर मदतीसाठी अर्ज करा',
    dlsaApplicationDesc: 'जिल्हा कायदेशीर सेवा प्राधिकरणाकडे (DLSA) अर्ज दाखल करा.',
    trackApplicationBtn: 'अर्जाची स्थिती तपासा',
    draftPetitionBuilderTitle: 'BNSS §479 जामीन अर्ज निर्माता',
    draftPetitionBuilderDesc: 'कोर्टात दाखल करण्यासाठी जामीन अर्ज त्वरित तयार करा.',
    launchDraftBuilderBtn: 'मसुदा निर्माता सुरू करा',

    nalsaGovIndia: 'भारत सरकार • राष्ट्रीय कायदेशीर सेवा प्राधिकर (NALSA / DLSA)',
    nalsaHelpline: 'NALSA हेल्पलाइन: 15100',
    nationalFreeLegalAidTitle: 'राष्ट्रीय मोफत कायदेशीर मदत प्रणाली.',
    nationalFreeLegalAidSub: 'कलम ३९A घटनात्मक जनादेश — सार्वजनिक नागरिक पोर्टल किंवा वकील कार्यस्थान निवडा.',
    publicPortalBtn: '1. सार्वजनिक पोर्टल',
    advocatePortalBtn: '2. वकील पोर्टल',
    publicCitizenAccess: 'सार्वजनिक नागरिक प्रवेश • कलम १२ कायदेशीर सेवा प्राधिकरण कायदा',
    freeLegalRepTitle: 'पात्र कच्च्या कैद्यांसाठी आणि कुटुंबांसाठी मोफत कायदेशीर प्रतिनिधित्व',
    freeLegalRepSub: 'पात्रता तपासा, DLSA वकिलासाठी अर्ज करा किंवा स्थिती ट्रॅक करा.',
    applyForFreeLawyerBtn: '+ मोफत DLSA वकिलासाठी अर्ज करा',
    tabScreener: '01. कलम १२ पात्रता स्क्रीनर',
    tabTracker: '02. थेट अर्ज ट्रॅकर',
    tabClinics: '03. DLSA क्लिनिक आणि हेल्पलाइन',
    screenerTitle: 'मोफत कायदेशीर मदत पात्रता स्क्रीनर',
    screenerSub: 'कलम १२ कायदेशीर सेवा प्राधिकरण कायदा, १९८',
    freeMandateBadge: '१००% मोफत सरकारी बचाव वकील जनादेश',
    selectCategoryLabel: '1. अर्जदार वर्ग निवडा *',
    eligibleEntitledBadge: 'मोफत DLSA सरकारी बचाव वकिलासाठी पात्र',

    judgePortalTitle: 'न्यायालयीन देखरेख पीठ',
    judgePortalDesc: 'कच्च्या कैद्यांच्या जामीन पात्रतेची स्वयंचलित तपासणी.',
    batchScreenerBtn: 'तुरुंग जनगणना स्कॅनर',
    orderRegistryBtn: 'आदेश नोंदवही',
    totalUndertrials: 'एकूण कच्ची कैदी',
    eligibleForRelease: 'सुटकेसाठी पात्र',
    pendingReview: 'समीक्षा प्रलंबित',

    footerRegistryDivision: 'रजिस्ट्री विभाग • भारतीय कायदेशीर मदत प्रणाली',
    termsAndConditions: 'अटी व शर्ती',
    supportHelpdesk: 'मदत व हेल्पलाइन',
    copyrightNotice: 'नेक्सोरा तर्फे प्रेमाने बनवले NEXORA',
  },
};
