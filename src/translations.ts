export type Language = 'en' | 'mr';

export interface Translations {
  nav: {
    about: string;
    heritage: string;
    plots: string;
    connectivity: string;
    whyUs: string;
    gallery: string;
    faq: string;
    bookVisit: string;
    downloadBrochure: string;
    langSwitch: string;
  };
  hero: {
    headline: string;
    tagline: string;
    subheadline: string;
    supporting: string;
    btnSiteVisit: string;
    btnWhatsApp: string;
    btnBrochure: string;
  };
  quickFacts: {
    fact1: string;
    fact1Sub: string;
    fact2: string;
    fact2Sub: string;
    fact3: string;
    fact3Sub: string;
    fact4: string;
    fact4Sub: string;
    fact5: string;
    fact5Sub: string;
    fact6: string;
    fact6Sub: string;
  };
  about: {
    label: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  heritage: {
    label: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    fortBadge: string;
  };
  plots: {
    label: string;
    heading: string;
    priceOnRequest: string;
    requestPrice: string;
    note: string;
    roadsCopy: string;
  };
  connectivity: {
    label: string;
    heading: string;
    body: string;
    getDirections: string;
    interactiveMap: string;
    loadMap: string;
    hubs: {
      swargate: { title: string; distance: string; note: string };
      highway: { title: string; distance: string; note: string };
      airport: { title: string; distance: string; note: string };
      fort: { title: string; distance: string; note: string };
    };
  };
  whyUs: {
    label: string;
    heading: string;
    cards: Array<{ title: string; desc: string }>;
  };
  gallery: {
    label: string;
    heading: string;
    subheading: string;
    tapToEnlarge: string;
    close: string;
    next: string;
    prev: string;
    captions: {
      img1: string;
      img2: string;
      img3: string;
      img4: string;
      img5: string;
    };
  };
  brochure: {
    button: string;
    heading: string;
    subheading: string;
    pill1: string;
    pill2: string;
    pill3: string;
    modalTitle: string;
    modalDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    privacyNote: string;
  };
  faq: {
    label: string;
    heading: string;
    subheading: string;
    items: Array<{ q: string; a: string }>;
  };
  enquiry: {
    label: string;
    heading: string;
    body: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailOptional: string;
    emailPlaceholder: string;
    plotSize: string;
    plotSizeSelect: string;
    preferredDate: string;
    preferredDateOptional: string;
    message: string;
    messageOptional: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    consent: string;
    successTitle: string;
    successDesc: string;
  };
  footer: {
    brandDesc: string;
    disclaimer: string;
    contactPerson: string;
    hours: string;
    privacyPolicy: string;
    googleMaps: string;
    rights: string;
  };
  privacyModal: {
    title: string;
    close: string;
    content: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      heritage: 'Heritage',
      plots: 'Plot Sizes',
      connectivity: 'Connectivity',
      whyUs: 'Why Purandar',
      gallery: 'Gallery',
      faq: 'FAQ',
      bookVisit: 'Book a Site Visit',
      downloadBrochure: 'Brochure',
      langSwitch: 'मराठी',
    },
    hero: {
      headline: 'Purandar Highlands',
      tagline: 'The Rise of New Pune',
      subheadline: '125 acres of agricultural plots, just 45 minutes from Swargate, Pune. Wake up to the view of historic Purandar Fort.',
      supporting: 'Peace. Silence. Cool breeze. Open skies.',
      btnSiteVisit: 'Book a Site Visit',
      btnWhatsApp: 'Chat on WhatsApp',
      btnBrochure: 'Download Brochure',
    },
    quickFacts: {
      fact1: '45 min from Swargate, Pune',
      fact1Sub: 'Direct scenic access',
      fact2: '125 Acres',
      fact2Sub: 'Master-planned expanse',
      fact3: 'Plots from 11,000 sq ft to 5 acres',
      fact3Sub: 'Flexible agricultural sizing',
      fact4: '30 ft elegant roads',
      fact4Sub: 'Wide internal circulation',
      fact5: '10 km aerial distance',
      fact5Sub: 'To upcoming international airport',
      fact6: '7 min to Highway',
      fact6Sub: 'Mumbai-Bangalore Hwy (Kikvi)',
    },
    about: {
      label: 'ABOUT THE PROJECT',
      heading: 'Land that lets you breathe',
      paragraph1: 'Purandar Highlands is a 125-acre project of agricultural plots, set in the midst of nature, just 45 minutes from Swargate, Pune.',
      paragraph2: 'Here the air is cool, the clouds drift low and the silence is real. Lush green surroundings stretch around you, with the historic Purandar Fort rising in the distance.',
      paragraph3: 'Whether you want a weekend retreat, a place to farm, or land to hold for the future, there is a plot size for you, from 11,000 sq ft to 5 acres.',
    },
    heritage: {
      label: 'HISTORIC HERITAGE',
      heading: 'Live in the shadow of history',
      paragraph1: 'Purandar Fort is the birthplace of Chhatrapati Sambhaji Maharaj, one of the most celebrated names in Maratha history. At Purandar Highlands, this landmark is not a day trip. It is your view.',
      paragraph2: 'Sunrise with the fort on the horizon, cool breeze from the hills, and a setting that few places near Pune can match.',
      fortBadge: 'Purandar Fort Horizon View',
    },
    plots: {
      label: 'PLOT SIZES & ROADS',
      heading: 'Choose your size, from 11,000 sq ft to 5 acres',
      priceOnRequest: 'Price on request',
      requestPrice: 'Request Price',
      note: 'All plots are agricultural plots.',
      roadsCopy: 'All plots are agricultural plots. Wide, elegant 30-foot roads run through the project, so access is easy for cars and visitors.',
    },
    connectivity: {
      label: 'CONNECTIVITY',
      heading: 'Close to Pune. Closer to what is coming.',
      body: 'Purandar Highlands is 45 minutes from Swargate, Pune. The Mumbai-Bangalore Highway is 7 minutes away from village Kikvi. The upcoming Chhatrapati Sambhaji Maharaj International Airport is 10 km away by aerial distance.',
      getDirections: 'Get Directions',
      interactiveMap: 'Interactive Google Map',
      loadMap: 'Load Interactive Map',
      hubs: {
        swargate: { title: 'Swargate, Pune', distance: '45 mins', note: 'Central Pune arterial link' },
        highway: { title: 'Mumbai-Bangalore Highway', distance: '7 mins', note: 'Via Kikvi village' },
        airport: { title: 'Upcoming International Airport', distance: '10 km', note: 'Aerial distance to Chhatrapati Sambhaji Maharaj Airport' },
        fort: { title: 'Purandar Fort', distance: 'Direct View', note: 'Birthplace of Chhatrapati Sambhaji Maharaj' },
      },
    },
    whyUs: {
      label: 'WHY PURANDAR HIGHLANDS',
      heading: 'A sanctuary crafted by nature and heritage',
      cards: [
        { title: 'Fort views', desc: 'Historic Purandar Fort as your backdrop.' },
        { title: 'Nature and silence', desc: 'Lush green, cool breeze, open skies.' },
        { title: 'Easy access', desc: '45 min from Swargate, highway in 7 min.' },
        { title: 'Flexible sizes', desc: '11,000 sq ft to 5 acres.' },
      ],
    },
    gallery: {
      label: 'PROJECT GALLERY',
      heading: 'Authentic Views from the Land',
      subheading: 'Genuine photographs captured on site at Purandar Highlands.',
      tapToEnlarge: 'Tap to view full resolution',
      close: 'Close (Esc)',
      next: 'Next',
      prev: 'Previous',
      captions: {
        img1: 'Purandar Highlands open agricultural land with gentle hills in the background',
        img2: 'Internal road alignment showing natural contours and clear skies',
        img3: 'Purandar Fort as seen on the horizon from Purandar Highlands',
        img4: 'Native vegetation and green cover across the project boundary',
        img5: 'Panoramic terrain view overlooking the Purandar valley',
      },
    },
    brochure: {
      button: 'Download Brochure',
      heading: 'The Official Project Brochure',
      subheading: 'Gain comprehensive insights into Purandar Highlands: 125-acre plotting layout, 30-foot internal arterial roads, regional aerial distance map, and project specifications.',
      pill1: 'Price on request',
      pill2: 'All agricultural plots',
      pill3: '45 min from Swargate',
      modalTitle: 'Download Project Brochure',
      modalDesc: 'Please enter your name and phone number to receive instant access to the official brochure PDF (1.3 MB).',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Anand Kulkarni',
      phoneLabel: 'Mobile Number',
      phonePlaceholder: '10-digit mobile number',
      submit: 'Verify & Download PDF',
      submitting: 'Preparing Brochure...',
      success: 'Brochure download started. Our team will contact you shortly.',
      privacyNote: 'Your information is confidential and used only for Purandar Highlands updates.',
    },
    faq: {
      label: 'FREQUENTLY ASKED QUESTIONS',
      heading: 'Essential Information',
      subheading: 'Clear, straightforward answers about Purandar Highlands.',
      items: [
        {
          q: 'How far is it from Pune?',
          a: "45 minutes' drive from Swargate.",
        },
        {
          q: 'What plot sizes are available?',
          a: '11,000 sq ft, 20,000 sq ft, 1, 2, 3, 4 and 5 acres.',
        },
        {
          q: 'What type of land is it?',
          a: 'All plots are agricultural plots.',
        },
        {
          q: 'What is the price?',
          a: 'Price is on request. Fill the form or call +91-9028986499.',
        },
        {
          q: 'How far is the airport?',
          a: 'About 10 km by aerial distance from the upcoming Chhatrapati Sambhaji Maharaj International Airport.',
        },
        {
          q: 'How do I book a site visit?',
          a: 'Use the form, WhatsApp or call. Our team is available 10 AM to 5 PM.',
        },
      ],
    },
    enquiry: {
      label: 'PLAN YOUR SITE VISIT',
      heading: 'Plan your site visit',
      body: 'See the land, the fort view and the roads for yourself. Leave your details and our team will call you to arrange a visit. Our team is available 10 AM to 5 PM.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Ramesh Patil',
      phone: 'Mobile Number',
      phonePlaceholder: '10-digit mobile number',
      email: 'Email',
      emailOptional: '(Optional)',
      emailPlaceholder: 'e.g. ramesh@example.com',
      plotSize: 'Plot Size of Interest',
      plotSizeSelect: 'Select a plot size (Agricultural Plot)',
      preferredDate: 'Preferred Visit Date',
      preferredDateOptional: '(Optional)',
      message: 'Message',
      messageOptional: '(Optional)',
      messagePlaceholder: 'Any questions or preferences for your visit...',
      submit: 'Request My Site Visit',
      submitting: 'Submitting Details...',
      consent: 'By submitting, you agree to be contacted about this project.',
      successTitle: 'Enquiry Received',
      successDesc: "Thank you. Mr. Saurabh Pawar's team will call you shortly to confirm your visit.",
    },
    footer: {
      brandDesc: '125 acres of verified agricultural plots in Ghera Purandar, Pune. Historic fort views and elegant 30-foot roads.',
      disclaimer: 'All plots are agricultural plots. Price on request.',
      contactPerson: 'Mr. Saurabh Pawar, 10 AM to 5 PM',
      hours: '10 AM to 5 PM',
      privacyPolicy: 'Privacy Policy',
      googleMaps: 'Google Maps Directions',
      rights: 'New Pune. All rights reserved.',
    },
    privacyModal: {
      title: 'Privacy Policy & Terms',
      close: 'Close Policy',
      content: 'New Pune respects your privacy. When you request a site visit or download our brochure, your details are held confidentially and solely used to provide official Purandar Highlands property information and schedule guided visits.',
    },
  },
  mr: {
    nav: {
      about: 'प्रकल्पाबद्दल',
      heritage: 'वारसा',
      plots: 'प्लॉटचे आकार',
      connectivity: 'कनेक्टिव्हिटी',
      whyUs: 'वैशिष्ट्ये',
      gallery: 'छायाचित्रे',
      faq: 'प्रश्नोत्तरे',
      bookVisit: 'साइट व्हिजिट',
      downloadBrochure: 'माहितीपत्रक',
      langSwitch: 'English',
    },
    hero: {
      headline: 'पुरंदर हायलँड्स',
      tagline: 'नवीन पुण्याचा उदय',
      subheadline: 'स्वारगेट, पुणे येथून अवघ्या ४५ मिनिटांवर १२५ एकरांचे शेतजमीन प्लॉट्स. ऐतिहासिक पुरंदर किल्ल्याच्या दर्शनात जागे व्हा.',
      supporting: 'शांतता. निःशब्दता. थंड वारा. मोकळे आकाश.',
      btnSiteVisit: 'साइट व्हिजिट बुक करा',
      btnWhatsApp: 'WhatsApp वर चॅट करा',
      btnBrochure: 'माहितीपत्रक डाउनलोड करा',
    },
    quickFacts: {
      fact1: 'स्वारगेट, पुणे येथून ४५ मिनिटे',
      fact1Sub: 'थेट व निसर्गरम्य प्रवास',
      fact2: '१२५ एकर',
      fact2Sub: 'प्रशस्त नियोजित प्रकल्प',
      fact3: '११,००० चौ. फूटांपासून ५ एकरांपर्यंत प्लॉट्स',
      fact3Sub: 'विविध आकारांचे शेतजमीन प्लॉट्स',
      fact4: '३० फूट रुंद देखणे रस्ते',
      fact4Sub: 'प्रकल्पांतर्गत प्रशस्त वाहतूक',
      fact5: 'आगामी आंतरराष्ट्रीय विमानतळापासून १० किमी',
      fact5Sub: 'हवाई अंतरावर',
      fact6: 'मुंबई-बंगळूर महामार्ग ७ मिनिटांवर',
      fact6Sub: 'किकवी गावापासून',
    },
    about: {
      label: 'प्रकल्पाविषयी',
      heading: 'मोकळा श्वास घेण्यासाठीची जमीन',
      paragraph1: 'पुरंदर हायलँड्स हा १२५ एकरांचा शेतजमीन प्लॉट्सचा प्रकल्प आहे. निसर्गाच्या कुशीत, स्वारगेट, पुणे येथून अवघ्या ४५ मिनिटांवर.',
      paragraph2: 'येथे हवा थंड आहे, ढग खाली उतरतात आणि शांतता खरीखुरी आहे. दूरवर ऐतिहासिक पुरंदर किल्ला दिसतो.',
      paragraph3: 'वीकेंड होमसाठी, शेतीसाठी किंवा भविष्यातील गुंतवणुकीसाठी, ११,००० चौ. फूटांपासून ते ५ एकरांपर्यंत तुमच्या गरजेनुसार प्लॉट निवडा.',
    },
    heritage: {
      label: 'ऐतिहासिक वारसा',
      heading: 'इतिहासाच्या सान्निध्यात राहा',
      paragraph1: 'पुरंदर किल्ला हे छत्रपती संभाजी महाराजांचे जन्मस्थान आहे. पुरंदर हायलँड्समध्ये हा किल्ला तुमच्या नजरेसमोर असतो.',
      paragraph2: 'क्षितिजावर किल्ल्यासह होणारी सूर्योदयाची पहाट, टेकड्यांवरून वाहणारा थंडगार वारा आणि पुण्याजवळ क्वचितच अनुभवायला मिळणारा हा निसर्गरम्य परिसर.',
      fortBadge: 'पुरंदर किल्ल्याचे प्रत्यक्ष दर्शन',
    },
    plots: {
      label: 'प्लॉटचे आकार व रस्ते',
      heading: 'तुमचा आकार निवडा: ११,००० चौ. फूट ते ५ एकर',
      priceOnRequest: 'किंमत विचारणा केल्यावर',
      requestPrice: 'किंमत विचारा',
      note: 'सर्व प्लॉट्स शेतजमीन प्लॉट्स आहेत. किंमत विचारणा केल्यावर सांगितली जाईल.',
      roadsCopy: 'सर्व प्लॉट्स शेतजमीन प्लॉट्स आहेत. रुंद आणि देखणे ३० फुटी रस्ते प्रकल्पातून जातात, ज्यामुळे कार आणि पाहुण्यांसाठी ये-जा सोयीस्कर आहे.',
    },
    connectivity: {
      label: 'कनेक्टिव्हिटी',
      heading: 'पुण्याच्या जवळ. भविष्याच्या अधिक जवळ.',
      body: 'पुरंदर हायलँड्स हे स्वारगेट, पुणे येथून ४५ मिनिटांवर आहे. मुंबई-बंगळूर महामार्ग किकवी गावावरून अवघ्या ७ मिनिटांवर आहे. आगामी छत्रपती संभाजी महाराज आंतरराष्ट्रीय विमानतळ १० किमी हवाई अंतरावर आहे.',
      getDirections: 'नकाशा व दिशा मिळवा',
      interactiveMap: 'गुगल नकाशा',
      loadMap: 'थेट नकाशा उघडा',
      hubs: {
        swargate: { title: 'स्वारगेट, पुणे', distance: '४५ मिनिटे', note: 'पुणे शहराशी जलद संपर्क' },
        highway: { title: 'मुंबई-बंगळूर महामार्ग', distance: '७ मिनिटे', note: 'किकवी गावामार्गे' },
        airport: { title: 'आगामी आंतरराष्ट्रीय विमानतळ', distance: '१० किमी', note: 'छत्रपती संभाजी महाराज आंतरराष्ट्रीय विमानतळ (हवाई अंतर)' },
        fort: { title: 'ऐतिहासिक पुरंदर किल्ला', distance: 'नजरेसमोर', note: 'छत्रपती संभाजी महाराजांचे जन्मस्थान' },
      },
    },
    whyUs: {
      label: 'पुरंदर हायलँड्स का?',
      heading: 'निसर्ग, इतिहास आणि भविष्याचा सुरेख संगम',
      cards: [
        { title: 'किल्ल्याचे दर्शन', desc: 'ऐतिहासिक पुरंदर किल्ला तुमच्या नजरेसमोर.' },
        { title: 'निसर्ग आणि शांतता', desc: 'हिरवागार परिसर, थंड वारा, मोकळे आकाश.' },
        { title: 'सुलभ प्रवेश', desc: 'स्वारगेटहून ४५ मिनिटे, महामार्ग ७ मिनिटांवर.' },
        { title: 'प्लॉटचे विविध आकार', desc: '११,००० चौ. फूट ते ५ एकर.' },
      ],
    },
    gallery: {
      label: 'छायाचित्रे',
      heading: 'जमिनीची खरीखुरी छायाचित्रे',
      subheading: 'पुरंदर हायलँड्सच्या प्रत्यक्ष जागेवरून टिपलेली छायाचित्रे.',
      tapToEnlarge: 'मोठे करून पाहण्यासाठी टॅप करा',
      close: 'बंद करा',
      next: 'पुढील',
      prev: 'मागील',
      captions: {
        img1: 'पुरंदर हायलँड्सचे मोकळे शेतजमीन प्लॉट्स आणि मागे दिसणाऱ्या टेकड्या',
        img2: 'प्रकल्पांतर्गत प्रशस्त ३० फूट अंतर्गत रस्ता',
        img3: 'पुरंदर हायलँड्सवरून दिसणारा ऐतिहासिक पुरंदर किल्ला',
        img4: 'परिसरातील नैसर्गिक हिरवळ आणि वनस्पती',
        img5: 'पुरंदर खोऱ्याचे विहंगम दृश्य',
      },
    },
    brochure: {
      button: 'माहितीपत्रक डाउनलोड करा',
      heading: 'प्रकल्पाचे अधिकृत माहितीपत्रक',
      subheading: '१२५ एकर शेतजमीन प्लॉट्स, ३० फूट रस्ते, कनेक्टिव्हिटी नकाशा आणि निसर्गरम्य पुरंदर परिसराची संपूर्ण माहिती एकाच संचामध्ये मिळवा.',
      pill1: 'किंमत विचारणा केल्यावर',
      pill2: 'सर्व शेतजमीन प्लॉट्स',
      pill3: '४५ मिनिटे स्वारगेटहून',
      modalTitle: 'प्रकल्प माहितीपत्रक डाउनलोड करा',
      modalDesc: 'अधिकृत माहितीपत्रक (PDF १.३ MB) तात्काळ मिळवण्यासाठी तुमचे नाव आणि मोबाईल नंबर नोंदवा.',
      nameLabel: 'पूर्ण नाव',
      namePlaceholder: 'उदा. आनंद कुलकर्णी',
      phoneLabel: 'मोबाईल नंबर',
      phonePlaceholder: '१० अंकी मोबाईल नंबर',
      submit: 'माहितीपत्रक मिळवा',
      submitting: 'माहितीपत्रक तयार होत आहे...',
      success: 'माहितीपत्रक डाउनलोड सुरू झाले आहे. आमची टीम लवकरच संपर्क करेल.',
      privacyNote: 'तुमची माहिती सुरक्षित ठेवली जाते आणि केवळ प्रकल्पाच्या माहितीसाठी वापरली जाते.',
    },
    faq: {
      label: 'वारंवार विचारले जाणारे प्रश्न',
      heading: 'महत्त्वाची माहिती',
      subheading: 'पुरंदर हायलँड्स प्रकल्पाविषयी आवश्यक माहिती.',
      items: [
        {
          q: 'पुण्यापासून किती अंतर आहे ?',
          a: 'स्वारगेटपासून ४५ मिनिटांच्या अंतरावर.',
        },
        {
          q: 'कोणते प्लॉट आकार उपलब्ध आहेत ?',
          a: '११,००० चौ. फूट, २०,००० चौ. फूट, तसेच १, २, ३, ४ आणि ५ एकर.',
        },
        {
          q: 'जमिनीचा प्रकार कोणता आहे ?',
          a: 'सर्व प्लॉट्स शेतजमीन प्लॉट्स आहेत.',
        },
        {
          q: 'किंमत किती आहे ?',
          a: 'किंमत विचारणा केल्यावर सांगितली जाईल. फॉर्म भरा किंवा +९१-९०२८९८६४९९ वर फोन करा.',
        },
        {
          q: 'विमानतळ किती दूर आहे ?',
          a: 'आगामी छत्रपती संभाजी महाराज आंतरराष्ट्रीय विमानतळापासून सुमारे १० किमी हवाई अंतर.',
        },
        {
          q: 'साइट व्हिजिट कशी बुक करायची ?',
          a: 'फॉर्म, WhatsApp किंवा फोन वापरा. आमची टीम सकाळी १० ते सायंकाळी ५ उपलब्ध आहे.',
        },
      ],
    },
    enquiry: {
      label: 'साइट व्हिजिट ठरवा',
      heading: 'तुमची साइट व्हिजिट ठरवा',
      body: 'प्रत्यक्ष जमीन, किल्ल्याचे दृश्य आणि रस्ते पाहा. तुमची माहिती द्या, आमची टीम तुम्हाला भेटीसाठी फोन करेल. आमची टीम सकाळी १० ते सायंकाळी ५ उपलब्ध आहे.',
      fullName: 'पूर्ण नाव',
      fullNamePlaceholder: 'उदा. रमेश पाटील',
      phone: 'मोबाईल नंबर',
      phonePlaceholder: '१० अंकी मोबाईल नंबर',
      email: 'ई-मेल',
      emailOptional: '(पर्यायी)',
      emailPlaceholder: 'उदा. ramesh@example.com',
      plotSize: 'प्लॉटचा आकार',
      plotSizeSelect: 'प्लॉटचा आकार निवडा (शेतजमीन प्लॉट)',
      preferredDate: 'भेटीची तारीख',
      preferredDateOptional: '(पर्यायी)',
      message: 'संदेश',
      messageOptional: '(पर्यायी)',
      messagePlaceholder: 'भेटीबाबत काही विचारणा असल्यास येथे लिहा...',
      submit: 'माझी साइट व्हिजिट नोंदवा',
      submitting: 'माहिती पाठवत आहे...',
      consent: 'माहिती पाठवून तुम्ही या प्रकल्पाबाबत संपर्क साधण्यास संमती देता.',
      successTitle: 'माहिती प्राप्त झाली',
      successDesc: 'धन्यवाद. श्री. सौरभ पवार यांची टीम तुमची भेट निश्चित करण्यासाठी लवकरच फोन करेल.',
    },
    footer: {
      brandDesc: 'घेरा पुरंदर, पुणे येथे १२५ एकरांचे शेतजमीन प्लॉट्स. किल्ल्याचे विहंगम दृश्य आणि ३० फूट देखणे अंतर्गत रस्ते.',
      disclaimer: 'सर्व प्लॉट्स शेतजमीन प्लॉट्स आहेत. किंमत विचारणा केल्यावर.',
      contactPerson: 'श्री. सौरभ पवार, सकाळी १० ते सायंकाळी ५',
      hours: 'सकाळी १० ते सायंकाळी ५',
      privacyPolicy: 'गोपनीयता धोरण',
      googleMaps: 'गुगल नकाशा दिशा',
      rights: 'नवीन पुणे. सर्व हक्क राखीव.',
    },
    privacyModal: {
      title: 'गोपनीयता धोरण व अटी',
      close: 'बंद करा',
      content: 'नवीन पुणे तुमच्या गोपनीयतेचा आदर करते. तुम्ही साइट व्हिजिट विनंती किंवा माहितीपत्रक डाउनलोड करता तेव्हा तुमची माहिती गोपनीय ठेवली जाते आणि केवळ प्रकल्पाची माहिती देण्यासाठी वापरली जाते.',
    },
  },
};
