const h=React.createElement;
const pages=[['Home','index.html'],['About','about.html'],['Skills Training','skills-training.html'],['Why Us','why-us.html'],['Vision & Mission','vision-mission.html'],['Location','location.html'],['Contact','contact.html']];
const navGroups=[
 {label:'Home',href:'index.html'},
 {label:'About',href:'about.html',children:[['About the school','about.html'],['Why Blessed Hill','why-us.html'],['Vision & mission','vision-mission.html']]},
 {label:'Learning',href:'skills-training.html'},
 {label:'Campus',href:'location.html'}
];
function navActive(group,current){return group.href===current||(group.children||[]).some(([,url])=>url===current)}
function Header({current}){const [open,setOpen]=React.useState(false);React.useEffect(()=>{document.body.classList.toggle('menu-open',open);return()=>document.body.classList.remove('menu-open')},[open]);return h(React.Fragment,null,
 h('div',{className:'topbar'},h('div',{className:'wrap topbar-inner'},
  h('span',null,h('b',null,'⌖'),' Kitasa village, Gombe A · Wakiso'),
  h('span',null,h('b',null,'→'),' Hoima road · 14 km from Kampala'),
  h('span',null,h('b',null,'▣'),' O & A Level · Day & boarding')
 )),
 h('header',null,h('div',{className:'topline'}),h('div',{className:'scroll-progress','aria-hidden':true}),h('div',{className:'wrap nav'},
  h('a',{className:'brand',href:'index.html','aria-label':'Blessed Hill High School home'},h('img',{className:'brand-mark',src:'images/badge.png',alt:'Blessed Hill High School badge',width:180,height:262}),h('span',{className:'brand-name'},'BLESSED HILL HIGH',h('small',null,'Wakiso District · Uganda'))),
  h('nav',{className:'links'+(open?' open':''),'aria-label':'Main navigation'},
   navGroups.map(group=>group.children?h('div',{className:'nav-drop'+(navActive(group,current)?' active':''),key:group.label},
    h('a',{href:group.href,className:navActive(group,current)?'active':'','aria-current':group.href===current?'page':undefined},group.label),
    h('div',{className:'nav-panel'},group.children.map(([name,url])=>h('a',{key:url,href:url,className:current===url?'active':''},name)))
   ):h('a',{key:group.href,href:group.href,className:current===group.href?'active':'','aria-current':current===group.href?'page':undefined},group.label)),
   h('a',{className:'btn nav-cta',href:'contact.html'},'Enquire')
  ),
  h('button',{className:'menu-toggle','aria-label':open?'Close menu':'Open menu','aria-expanded':open,onClick:()=>setOpen(!open)},open?'×':'☰')
 )))}
function Footer(){return h('footer',{className:'footer'},h('div',{className:'wrap'},
 h('div',{className:'footer-intro'},h('img',{src:'images/badge.png',alt:'',width:72,height:104}),h('div',null,h('h3',null,'Blessed Hill High School'),h('p',{className:'motto'},'Trust in God and Persevere.'))),
 h('div',{className:'footer-grid'},
  h('div',null,h('h4',null,'The school'),h('p',null,'A mixed day and boarding secondary school in Kitasa village, where academics, Christian principles and practical skills grow together.')),
  h('div',null,h('h4',null,'Explore'),h('div',{className:'footer-links'},pages.map(([n,u])=>h('a',{href:u,key:u},n)))),
  h('div',null,h('h4',null,'Get in touch'),h('div',{className:'footer-links'},h('span',null,'Kitasa village, Gombe A, L.C.I'),h('span',null,'Wakiso District, Uganda'),h('span',null,'Along Hoima road'),h('a',{href:'location.html'},'Find the campus'),h('a',{href:'contact.html'},'Ask about admission')))
 ),
 h('div',{className:'footer-bottom'},h('span',null,'© ',new Date().getFullYear(),' Blessed Hill High School. All rights reserved.'),h('a',{href:'contact.html'},'Start an enquiry'))
))}
function Shell({current,children}){React.useEffect(()=>{window.scrollTo(0,0)},[]);return h(React.Fragment,null,h(Header,{current}),children,h(Footer),h(ScrollEffects))}
function ScrollEffects(){const [showTop,setShowTop]=React.useState(false);React.useEffect(()=>{const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const progress=max>0?window.scrollY/max:0;document.documentElement.style.setProperty('--page-progress',(progress*100)+'%');setShowTop(window.scrollY>480)};update();window.addEventListener('scroll',update,{passive:true});let observer;const targets=[...document.querySelectorAll('main .section-head,main .card,main .stat-card,main .number-card,main .photo-card,main .banner,main .quote-box,main .timeline li,main .form-card,main .contact-panel,main .programme-card,main .life-card,main .leader-card,main .quote-card,main .director-copy,main .why-panel')];if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});targets.forEach(target=>{target.classList.add('reveal-item');observer.observe(target)});document.documentElement.classList.add('motion-ready')}else{targets.forEach(target=>target.classList.add('is-visible'))}return()=>{window.removeEventListener('scroll',update);if(observer)observer.disconnect();document.documentElement.classList.remove('motion-ready');targets.forEach(target=>target.classList.remove('reveal-item','is-visible'))}},[]);return h('button',{type:'button',className:'back-to-top'+(showTop?' visible':''),'aria-label':'Back to top',onClick:()=>window.scrollTo({top:0,behavior:'smooth'})},'↑')}
function Button({href,children,dark=false,outline=false}){return h('a',{href,className:'btn'+(dark?' dark':'')+(outline?' outline':'')},children)}
function PageHero({crumb,title,copy}){return h('section',{className:'page-hero'},h('div',{className:'wrap'},h('div',{className:'crumb'},crumb),h('h1',null,title),h('p',null,copy)))}
function Head({kicker,title,copy,center=false}){return h('div',{className:'section-head'+(center?' center':'')},h('div',{className:'kicker'},kicker),h('h2',null,title),copy?h('p',{className:'lead'},copy):null)}
function CTA({title,copy,button='Talk to our team',yellow=false}){return h('section',{className:'section compact'},h('div',{className:'wrap'},h('div',{className:'banner'+(yellow?' yellow':'')},h('div',null,h('h2',null,title),h('p',null,copy)),h(Button,{href:'contact.html',dark:yellow},button+' ↗'))))}
function Home(){
 const slides=[
  {image:"url('images/campus.jpg') center 38% / cover",kicker:'Mixed day & boarding · O & A Level',title:['Room to rise. ','Purpose to go further.'],copy:'A welcoming school community where strong academics, Christian values and practical skills give every learner room to grow.'},
  {image:"url('images/classroom.jpg') center / cover",kicker:'A school with purpose',title:['Knowledge, ','character and confidence.'],copy:'Classwork, Christian principles and talent development sit side by side, so students can prepare for a changing world.'},
  {image:"url('images/student-life.jpg') center / cover",kicker:'Kitasa village · Wakiso District',title:['A campus with ','room to belong.'],copy:'Blessed Hill sits on 3.2 acres in Kitasa, about 14 km from Kampala, with day and boarding options for families.'}
 ];
 const quotes=[
  ['No student is found unteachable, once given the proper education system that suits him or her.','A guiding belief'],
  ['Trust in God and Persevere.','Our motto'],
  ['We are focused on preparing children for the changing conditions of today and tomorrow.','Our focus']
 ];
 const programmes=[
  ['O Level','Academics','A structured lower-secondary path that builds the foundation for later study.','about.html','images/classroom.jpg'],
  ['A Level','Academics','Advanced-level study for learners preparing for the next stage after school.','about.html','images/student-life.jpg'],
  ['Christian life','Values','Outstanding Christian principles that encourage responsibility and moral growth.','vision-mission.html','images/student-life.jpg'],
  ['Skills training','Practice','Hands-on learning, including soap making, that students can put to work.','skills-training.html','images/practical-learning.jpg'],
  ['Day school','School life','A day option for families who want their children learning on the hill and home each evening.','why-us.html','images/classroom.jpg'],
  ['Boarding','School life','Boarding for students who live as part of the school community. Ask about current availability.','contact.html','images/campus.jpg']
 ];
 const [slide,setSlide]=React.useState(0);
 const [quote,setQuote]=React.useState(0);
 React.useEffect(()=>{const id=setInterval(()=>setSlide(x=>(x+1)%slides.length),7000);return()=>clearInterval(id)},[]);
 return h(Shell,{current:'index.html'},h('main',null,
  h('section',{className:'hero hero-slider','aria-roledescription':'carousel','aria-label':'School highlights'},
   slides.map((item,i)=>h('div',{key:item.kicker,className:'hero-slide'+(i===slide?' active':''),style:{background:'linear-gradient(100deg,rgba(5,31,62,.92) 0%,rgba(7,49,93,.72) 46%,rgba(8,43,85,.28) 100%),'+item.image},'aria-hidden':i!==slide})),
   h('div',{className:'wrap hero-inner hero-stage'},
    h('div',{className:'hero-copy-block',key:slide},
     h('div',{className:'eyebrow'},slides[slide].kicker),
     h('h1',null,slides[slide].title[0],h('em',null,slides[slide].title[1])),
     h('p',{className:'hero-copy'},slides[slide].copy),
     h('div',{className:'hero-actions'},h(Button,{href:'about.html'},'Discover the school'),h(Button,{href:'contact.html',outline:true},'Enquire about admission'))
    ),
    h('div',{className:'hero-controls'},
     h('button',{type:'button','aria-label':'Previous highlight',onClick:()=>setSlide(x=>(x+slides.length-1)%slides.length)},'‹'),
     h('div',{className:'hero-dots'},slides.map((item,i)=>h('button',{key:item.kicker,type:'button',className:i===slide?'active':'','aria-label':'Show highlight '+(i+1),'aria-current':i===slide?'true':undefined,onClick:()=>setSlide(i)}))),
     h('button',{type:'button','aria-label':'Next highlight',onClick:()=>setSlide(x=>(x+1)%slides.length)},'›')
    )
   )
  ),
  h('div',{className:'factbar'},h('div',{className:'wrap factbar-inner'},[['3.2','Acres in Kitasa'],['O & A','Level secondary'],['Day +','Boarding options'],['14 km','From Kampala']].map(([n,l])=>h('div',{className:'fact',key:l},h('strong',null,n),h('span',null,l))))),

  h('section',{className:'section white'},h('div',{className:'wrap director-layout'},
   h('div',{className:'director-photo'},h('img',{src:'images/director.jpg',alt:'Mr. Bwegyeme Deogratias, Director of Blessed Hill High School'})),
   h('div',{className:'director-copy'},
    h('div',{className:'kicker'},'Message from the Director'),
    h('h2',null,'Preparing young people for a changing world.'),
    h('p',{className:'lead'},'“Our responsibility is to provide an environment for classwork and talent development.”'),
    h('p',null,'Director Mr. Bwegyeme Deogratias describes a school that supports students in the classroom and as they discover their abilities. Academic performance matters, and so does resilience.'),
    h('p',null,'Blessed Hill brings learning together with Christian principles and practical skills, so learners can face today and tomorrow with purpose.'),
    h('div',{className:'director-sign'},h('strong',null,'Mr. Bwegyeme Deogratias'),h('span',null,'Director')),
    h(Button,{href:'about.html',dark:true},'Read more about the school')
   )
  )),

  h('section',{className:'section'},h('div',{className:'wrap'},
   h(Head,{kicker:'Learning at Blessed Hill',title:'What students can grow into here.',copy:'A clear set of pathways across academics, faith, practical skills and how students take part in school life.',center:true}),
   h('div',{className:'programme-grid'},programmes.map(([title,tag,copy,href,image])=>h('article',{className:'programme-card',key:title},
    h('div',{className:'programme-media','aria-hidden':true,style:{background:"linear-gradient(180deg,rgba(8,43,85,.05),rgba(8,43,85,.55)),url('"+image+"') center / cover"}}),
    h('div',{className:'programme-body'},h('span',{className:'pill'},tag),h('h3',null,h('a',{href},title)),h('p',null,copy),h('a',{className:'text-link',href},'Learn more →'))
   )))
  )),

  h('section',{className:'section why-section'},h('div',{className:'wrap why-layout'},
   h('div',{className:'why-panel'},
    h('div',{className:'kicker'},'Why choose us'),
    h('h2',null,'Learning that goes beyond the classroom.'),
    h('p',null,'Blessed Hill combines secondary academics with Christian principles, resilience and practical talent development. Students need knowledge, character and the confidence to adapt.'),
    h('p',null,'Day and boarding options give families a choice in how students take part in school life, on a 3.2-acre campus in Kitasa village.'),
    h(Button,{href:'why-us.html'},'See why families choose us')
   ),
   h('div',{className:'why-stats'},[['3.2 acres','Campus in Kitasa village, Gombe A'],['O & A Level','Secondary education offered'],['Two options','Day school and boarding'],['Faith first','Christian principles at the centre']].map(([n,d])=>h('article',{className:'stat-card',key:n},h('strong',null,n),h('span',null,d))))
  )),

  h('section',{className:'section white'},h('div',{className:'wrap'},
   h(Head,{kicker:'Life on the hill',title:'Three parts of one school day.',copy:'The same priorities that shape admissions also shape how students spend their time.',center:true}),
   h('div',{className:'life-grid'},[
    ['Classwork','O and A Level study, with a clear academic focus.','about.html','images/classroom.jpg'],
    ['Talent','Practical skills such as soap making, learned by doing.','skills-training.html','images/practical-learning.jpg'],
    ['Character','A motto to live by: Trust in God and Persevere.','vision-mission.html','images/student-life.jpg']
   ].map(([t,d,u,img])=>h('a',{className:'life-card',href:u,key:t,style:{background:"linear-gradient(180deg,rgba(8,43,85,.05) 20%,rgba(5,31,62,.88)),url('"+img+"') center / cover"}},h('span',null,'Explore'),h('h3',null,t),h('p',null,d))))
  )),

  h('section',{className:'section compact gold-wash'},h('div',{className:'wrap leader-layout'},
   h('div',{className:'leader-card'},
    h('img',{src:'images/director.jpg',alt:''}),
    h('div',null,h('div',{className:'kicker'},'Leadership'),h('h3',null,'Mr. Bwegyeme Deogratias'),h('p',{className:'role'},'Director'),h('p',null,'Leads a school committed to classwork, talent development and young people who can adapt without being controlled by a changing world.'))
   ),
   h('div',{className:'leader-points'},[['01','Classwork','An environment where academic learning is taken seriously.'],['02','Talent','Room for practical abilities to be noticed and developed.'],['03','Resilience','Preparation for the conditions of today and tomorrow.']].map(([n,t,d])=>h('article',{className:'number-card',key:n},h('b',null,n),h('div',null,h('h3',null,t),h('p',null,d)))))
  )),

  h('section',{className:'section blue quote-section'},h('div',{className:'wrap'},
   h(Head,{kicker:'Words that guide us',title:'The promises we keep in view.',center:true}),
   h('div',{className:'quote-stage'},quotes.map(([text,who],i)=>h('button',{type:'button',key:who,className:'quote-card'+(i===quote?' active':''),onClick:()=>setQuote(i),'aria-pressed':i===quote},h('p',null,'“'+text+'”'),h('cite',null,who)))),
   h('div',{style:{textAlign:'center',marginTop:28}},h(Button,{href:'vision-mission.html'},'Vision, mission and motto'))
  )),

  h('section',{className:'section compact updates-section'},h('div',{className:'wrap'},
   h(Head,{kicker:'Your next step',title:'Explore what’s next at Blessed Hill.',copy:'Get to know practical learning, school life and how to find the campus.',center:true}),
   h('div',{className:'updates-grid'},[
    ['Practical learning','See how skills training gives students room to learn by doing.','skills-training.html','images/practical-learning.jpg','Explore skills training'],
    ['Plan a visit','Find the school in Kitasa village, Gombe A, and see directions.','location.html','images/campus.jpg','Find the campus'],
    ['Ask about admission','Contact the school about enrolment, fees and day or boarding options.','contact.html','images/classroom.jpg','Make an enquiry']
   ].map(([title,copy,href,image,action])=>h('article',{className:'update-card',key:title},
    h('a',{className:'update-image',href,tabIndex:-1,'aria-hidden':true,style:{backgroundImage:"linear-gradient(180deg,rgba(8,43,85,.02),rgba(8,43,85,.22)),url('"+image+"')"}}),
    h('div',{className:'update-body'},h('span',{className:'update-label'},'Blessed Hill'),h('h3',null,h('a',{href},title)),h('p',null,copy),h('a',{className:'text-link',href},action+' →'))
   )))
  )),
  h('section',{className:'section compact'},h('div',{className:'wrap'},h('div',{className:'banner'},h('div',null,h('h2',null,'Come and see what learning on the hill can mean.'),h('p',null,'Find the campus in Kitasa village, or send an enquiry about admission, fees and boarding.')),h('div',{className:'banner-actions'},h(Button,{href:'contact.html',dark:true},'Enquire'),h(Button,{href:'location.html',outline:true},'Get directions')))))
 ))
}
function About(){return h(Shell,{current:'about.html'},h('main',null,h(PageHero,{crumb:'Our school',title:'Learning with purpose. Growing with confidence.',copy:'A mixed day and boarding secondary school in Kitasa village, Gombe A, where learning, Christian values and practical skills help young people prepare for what comes next.'}),h('section',{className:'section'},h('div',{className:'wrap grid-2'},h('div',null,h('div',{className:'kicker'},'A message from the Director'),h('h2',null,'Preparing young people for a changing world.'),h('p',{className:'lead'},'“Our responsibility is to provide an environment for classwork and talent development.”'),h('p',null,'Director Mr. Bwegyeme Deogratias describes a school experience that supports students both in the classroom and as they discover their abilities.'),h('p',null,'Academic performance matters, and so does resilience. At Blessed Hill, the goal is to help learners build both as they prepare for today and tomorrow.'),h('div',{className:'kicker',style:{marginTop:24}},'Mr. Bwegyeme Deogratias · Director')),h('div',{className:'photo-card alt'}))),h('section',{className:'section blue-wash'},h('div',{className:'wrap'},h(Head,{kicker:'What you can expect',title:'A balanced secondary school experience',copy:'A community for learning, character and talent development.'}),h('div',{className:'grid-3'},[['01','Academic focus','O and A Level secondary education.'],['02','Christian principles','Values that encourage responsibility and moral growth.'],['03','Talent and skills','Space for practical learning and abilities to develop.']].map(([n,t,d])=>h('article',{className:'number-card',key:n},h('b',null,n),h('div',null,h('h3',null,t),h('p',null,d))))))),h(CTA,{title:'Want to know more about the school?',copy:'Our team can help you learn about admission, boarding and school life.'})))}
function Skills(){const items=[['◉','Soap making','Students learn the basics of making soap, a useful product with potential to be made and sold.'],['▤','Learning by doing','Practical training gives students a chance to apply ideas and build confidence through making.'],['↗','Enterprise thinking','Explore how a practical skill can connect to initiative, resourcefulness and future opportunities.']];return h(Shell,{current:'skills-training.html'},h('main',null,h(PageHero,{crumb:'Beyond the classroom',title:'Practical skills for real life.',copy:'Skills training gives students a chance to explore useful abilities alongside a full academic timetable.'}),h('section',{className:'section'},h('div',{className:'wrap'},h(Head,{kicker:'Learn through practice',title:'Knowledge you can put to work',copy:'Explore approachable practical skills that turn learning into ideas students can put to work.'}),h('div',{className:'grid-3'},items.map(([ic,t,d])=>h('article',{className:'card',key:t},h('div',{className:'icon'},ic),h('h3',null,t),h('p',null,d))))),),h('section',{className:'section green-wash'},h('div',{className:'wrap grid-2'},h('div',null,h('div',{className:'kicker'},'Featured skill'),h('h2',null,'Soap making: from ingredients to a finished product.'),h('p',{className:'lead'},'Students are introduced to making and selling soap as a practical, marketable skill.'),h('p',null,'This hands-on activity reflects the school’s wider aim: support learning in class while making room for talents and useful skills to grow.'),h(Button,{href:'contact.html',dark:true},'Ask about skills training ↗')),h('div',{className:'photo-card featured-skill-photo'}))),h(CTA,{title:'Curious about what students learn?',copy:'Ask the school about current programs and practical training.'})))}
function WhyUs(){
 return h(Shell,{current:'why-us.html'},h('main',null,
  h(PageHero,{crumb:'Why Blessed Hill',title:'A place to learn, grow and belong.',copy:'A campus, curriculum and community built around well-rounded growth.'}),
  h('section',{className:'section'},h('div',{className:'wrap'},
   h(Head,{kicker:'The Blessed Hill difference',title:'Room for learning. Space for possibility.',copy:'Get to know the school through the details that shape its day-to-day experience.'}),
   h('div',{className:'grid-3'},[['3.2 acres','Campus in Kitasa village, Gombe A'],['O & A Level','Secondary education offered'],['Day & boarding','Options for students and families']].map(([n,d])=>h('article',{className:'stat-card',style:{background:'var(--navy)'},key:n},h('strong',null,n),h('span',null,d))))
  )),
  h('section',{className:'section green-wash'},h('div',{className:'wrap grid-2'},
   h('div',{className:'photo-card alt balanced-approach-photo'}),
   h('div',null,h('div',{className:'kicker'},'A balanced approach'),h('h2',null,'Strong academics and more.'),h('p',{className:'lead'},'Students need knowledge, character and the confidence to adapt.'),h('p',null,'Blessed Hill combines secondary academics with Christian principles, resilience-building and practical talent development. Day and boarding options offer families a choice in how students take part in school life.'),h('ul',{className:'check-list'},['Christian values at the heart of learning','Classwork and talent development','Useful practical skills'].map(x=>h('li',{key:x},x))),h(Button,{href:'about.html',dark:true},'Explore the school ↗'))
  )),
  h(CTA,{title:'See if Blessed Hill is right for your family.',copy:'Get in touch to ask about current admissions and boarding availability.',button:'Make an enquiry'})
 ))
}
function Vision(){const data={Vision:'To nurture a future generation that will adapt to, but not be controlled by, the volatile global environment.',Mission:'To provide quality secondary education with outstanding Christian principles, in order to bring up well-balanced and morally upright youth.',Motto:'Trust in God and Persevere.'};const [active,setActive]=React.useState('Vision');return h(Shell,{current:'vision-mission.html'},h('main',null,h(PageHero,{crumb:'What guides us',title:'Our vision, mission and motto.',copy:'The purpose behind the learning, values and relationships that shape life at Blessed Hill.'}),h('section',{className:'section blue'},h('div',{className:'wrap'},h(Head,{kicker:'Our foundation',title:'A clear purpose for every step.',copy:'Select each statement to read what guides our school community.',center:true}),h('div',{className:'tabs','role':'tablist'},Object.keys(data).map(x=>h('button',{key:x,className:'tab'+(active===x?' active':''),'role':'tab','aria-selected':active===x,onClick:()=>setActive(x)},x))),h('div',{className:'tab-content fade-in','role':'tabpanel',key:active},h('p',null,active==='Motto'?'“'+data[active]+'”':data[active])))),h('section',{className:'section gold-wash'},h('div',{className:'wrap grid-2'},h('div',null,h('div',{className:'kicker'},'Our promise'),h('h2',null,'Perseverance opens possibilities.'),h('p',{className:'lead'},'We believe students can grow when they receive an education suited to their needs.'),h('p',null,'This means encouraging resilience, balancing classwork with talent development, and helping young people become morally upright and ready for a changing world.')),h('div',{className:'card'},h('div',{className:'icon'},'✳'),h('h3',null,'Trust in God and Persevere.'),h('p',null,'The school motto reflects the faith and determination at the heart of the Blessed Hill community.')))),h(CTA,{title:'See our purpose in practice.',copy:'Explore the school’s learning approach and practical skills programs.'})))}
function Location(){const steps=[['From Kampala','Head out on the Kampala–Hoima road, approximately 14 km from the city centre.'],['At Kayunga Trading Centre','Turn off the main road about 1 km before Wakiso town headquarters.'],['Continue to Kitasa','Travel approximately 2 km off the main road into Kitasa village.'],['Arrive at the campus','Blessed Hill is in Kitasa village, Gombe A, L.C.I, Wakiso District.']];return h(Shell,{current:'location.html'},h('main',null,h(PageHero,{crumb:'Find us',title:'Make your way to Blessed Hill.',copy:'The school is located in Kitasa village, Gombe A, Wakiso District, along Hoima road.'}),h('section',{className:'section'},h('div',{className:'wrap grid-2'},h('div',null,h('div',{className:'kicker'},'Getting here'),h('h2',null,'A campus in Wakiso District.'),h('p',{className:'lead'},'Blessed Hill High School is about 14 km from Kampala city centre.'),h('ol',{className:'timeline'},steps.map(([t,d])=>h('li',{key:t},h('div',null,h('strong',null,t),h('span',null,d))))),h(Button,{href:'https://www.google.com/maps/search/?api=1&query=Blessed+Hill+High+School+Kitasa+Wakiso+Uganda',dark:true},'Open directions ↗')),h('iframe',{className:'map-frame',title:'Map showing Wakiso District, Uganda',loading:'lazy',src:'https://www.google.com/maps?q=Kitasa,+Wakiso+District,+Uganda&output=embed',referrerPolicy:'no-referrer-when-downgrade'}))),h(CTA,{title:'Planning to visit?',copy:'Please contact the school first to ask about arranging your visit.'})))}
function Contact(){
 const faqItems=[['What levels does the school offer?','The school offers O and A Level secondary education.'],['Is boarding available?','Blessed Hill offers both day and boarding options. Please enquire about current availability.'],['Where is the campus?','Kitasa village, Gombe A, L.C.I, Wakiso District, along Hoima road.']];
 return h(Shell,{current:'contact.html'},h('main',null,
  h(PageHero,{crumb:'Get in touch',title:'Let’s start a conversation.',copy:'Have a question about admission, fees, boarding availability or everyday life at Blessed Hill? We’d be glad to help.'}),
  h('section',{className:'section'},h('div',{className:'wrap contact-grid'},
   h('aside',{className:'contact-panel'},
    h('div',{className:'kicker'},'Contact the school'),h('h2',null,'We’re here to help.'),h('p',null,'Send an enquiry and the school office can follow up with you.'),
    h('div',{className:'contact-fact'},h('b',null,'Campus'),h('span',null,'Kitasa village, Gombe A, L.C.I, Wakiso District, Uganda')),
    h('div',{className:'contact-fact'},h('b',null,'Location'),h('span',null,'Along Hoima road · approximately 14 km from Kampala')),
    h('div',{className:'contact-fact'},h('b',null,'Admissions'),h('span',null,'Ask about enrolment, fees and boarding availability for the current term.'))
   ),
   h('div',{className:'form-card'},h('h2',{style:{fontSize:'1.75rem'}},'Send an enquiry'),h('p',null,'Share a few details and the school office will follow up with you.'),
    h('form',{name:'school-enquiry',method:'POST','data-netlify':'true','netlify-honeypot':'bot-field',action:'thank-you.html'},
     h('input',{type:'hidden',name:'form-name',value:'school-enquiry'}),
     h('p',{style:{display:'none'}},h('label',null,'Don’t fill this out ',h('input',{name:'bot-field'}))),
     h('div',{className:'field-row'},h('div',{className:'field'},h('label',{htmlFor:'name'},'Full name'),h('input',{id:'name',name:'name',autoComplete:'name',required:true})),h('div',{className:'field'},h('label',{htmlFor:'phone'},'Phone number'),h('input',{id:'phone',name:'phone',type:'tel',autoComplete:'tel',required:true}))),
     h('div',{className:'field'},h('label',{htmlFor:'email'},'Email address (optional)'),h('input',{id:'email',name:'email',type:'email',autoComplete:'email'})),
     h('div',{className:'field'},h('label',{htmlFor:'topic'},'What are you enquiring about?'),h('select',{id:'topic',name:'topic',defaultValue:'Admission'},['Admission','Fees','Boarding','School life','Skills training','Other'].map(x=>h('option',{key:x},x)))),
     h('div',{className:'field'},h('label',{htmlFor:'message'},'Your message'),h('textarea',{id:'message',name:'message',required:true})),
     h('button',{className:'btn green',type:'submit'},'Send enquiry ↗'),
     h('p',{className:'form-note'},'Submitting this form sends your enquiry to the school through its Netlify-hosted website.')
    )
   )
  )),
  h('section',{className:'section compact green-wash'},h('div',{className:'wrap'},h(Head,{kicker:'Common questions',title:'Before you reach out'}),h(FAQ,{items:faqItems})))
 ))
}
function FAQ({items}){const [open,setOpen]=React.useState(0);return h('div',null,items.map(([q,a],i)=>h('div',{className:'faq-item',key:q},h('button',{className:'faq-question','aria-expanded':open===i,onClick:()=>setOpen(open===i?-1:i)},q,h('i',null,open===i?'−':'+')),open===i?h('div',{className:'faq-answer fade-in'},h('p',null,a)):null)))}
function Thanks(){return h(Shell,{current:'contact.html'},h('main',null,h(PageHero,{crumb:'Message received',title:'Thank you for getting in touch.',copy:'Your enquiry has been sent. The school will get back to you about your question.'}),h('section',{className:'section compact'},h('div',{className:'wrap',style:{maxWidth:760,textAlign:'center'}},h('div',{className:'icon',style:{margin:'0 auto 22px',background:'var(--green-pale)',color:'var(--green)'}},'✓'),h(Button,{href:'index.html',dark:true},'Back to home ↗')))))}
const filename=location.pathname.split('/').pop()||'index.html';const components={'index.html':Home,'about.html':About,'skills-training.html':Skills,'why-us.html':WhyUs,'vision-mission.html':Vision,'location.html':Location,'contact.html':Contact,'thank-you.html':Thanks};const Component=components[filename]||Home;ReactDOM.createRoot(document.getElementById('root')).render(h(Component));
