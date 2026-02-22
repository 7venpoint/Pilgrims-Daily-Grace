const fs = require('fs');
const path = require('path');

const categories = {
  faith: {
    themes: [
      { text: 'I am a child of God, chosen and deeply loved. My identity is rooted in Christ alone.', verse: 'See what great love the Father has lavished on us, that we should be called children of God!', ref: '1 John 3:1' },
      { text: 'My faith is unshakable because it is built on the rock of God\'s promises.', verse: 'Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.', ref: 'Matthew 7:24' },
      { text: 'I walk by faith, not by sight. God\'s plan for my life is greater than I can imagine.', verse: 'For we live by faith, not by sight.', ref: '2 Corinthians 5:7' },
      { text: 'God has not given me a spirit of fear, but of power, love, and a sound mind.', verse: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.', ref: '2 Timothy 1:7' },
      { text: 'I am more than a conqueror through Christ who strengthens me.', verse: 'No, in all these things we are more than conquerors through him who loved us.', ref: 'Romans 8:37' },
      { text: 'The Lord is my shepherd; I lack nothing. He leads me beside still waters and restores my soul.', verse: 'The Lord is my shepherd, I lack nothing.', ref: 'Psalm 23:1' },
      { text: 'I trust in the Lord with all my heart and lean not on my own understanding.', verse: 'Trust in the Lord with all your heart and lean not on your own understanding.', ref: 'Proverbs 3:5' },
      { text: 'I am fearfully and wonderfully made. God\'s works are wonderful and I know that full well.', verse: 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.', ref: 'Psalm 139:14' },
      { text: 'The Lord is my light and my salvation. Whom shall I fear?', verse: 'The Lord is my light and my salvation—whom shall I fear?', ref: 'Psalm 27:1' },
      { text: 'I stand firm in my faith, knowing that God is faithful to complete the good work He started in me.', verse: 'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.', ref: 'Philippians 1:6' },
      { text: 'My faith moves mountains. Nothing is impossible with God.', verse: 'Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move.', ref: 'Matthew 17:20' },
      { text: 'I am rooted and established in love, and my faith grows stronger each day.', verse: 'So that Christ may dwell in your hearts through faith. And I pray that you, being rooted and established in love.', ref: 'Ephesians 3:17' },
      { text: 'God\'s Word is alive and active in my life, sharper than any double-edged sword.', verse: 'For the word of God is alive and active. Sharper than any double-edged sword.', ref: 'Hebrews 4:12' },
      { text: 'I have been justified by faith and have peace with God through the Lord Jesus Christ.', verse: 'Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ.', ref: 'Romans 5:1' },
      { text: 'The righteous will live by faith, and I choose to live fully for God today.', verse: 'The righteous will live by faith.', ref: 'Habakkuk 2:4' },
      { text: 'My faith is the substance of things hoped for, the evidence of things not yet seen.', verse: 'Now faith is confidence in what we hope for and assurance about what we do not see.', ref: 'Hebrews 11:1' },
      { text: 'I am shielded by God\'s power through faith until the coming of salvation.', verse: 'Who through faith are shielded by God\'s power until the coming of the salvation that is ready to be revealed.', ref: '1 Peter 1:5' },
      { text: 'Without faith it is impossible to please God, and I choose faith today.', verse: 'And without faith it is impossible to please God, because anyone who comes to him must believe that he exists.', ref: 'Hebrews 11:6' },
      { text: 'I look not at what is seen but at what is unseen, for what is seen is temporary.', verse: 'So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.', ref: '2 Corinthians 4:18' },
      { text: 'God is my refuge and strength, an ever-present help in trouble.', verse: 'God is our refuge and strength, an ever-present help in trouble.', ref: 'Psalm 46:1' },
      { text: 'I am alive in Christ. Old things have passed away and all things have become new.', verse: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!', ref: '2 Corinthians 5:17' },
      { text: 'I am strengthened with all power according to God\'s glorious might.', verse: 'Being strengthened with all power according to his glorious might so that you may have great endurance and patience.', ref: 'Colossians 1:11' },
      { text: 'I hold unswervingly to the hope I profess, for God who promised is faithful.', verse: 'Let us hold unswervingly to the hope we profess, for he who promised is faithful.', ref: 'Hebrews 10:23' },
      { text: 'The Lord will fight for me; I need only to be still.', verse: 'The Lord will fight for you; you need only to be still.', ref: 'Exodus 14:14' },
      { text: 'I am blessed when I believe that what the Lord has said will be accomplished.', verse: 'Blessed is she who has believed that the Lord would fulfill his promises to her!', ref: 'Luke 1:45' },
      { text: 'God\'s grace is sufficient for me, for His power is made perfect in weakness.', verse: 'But he said to me, My grace is sufficient for you, for my power is made perfect in weakness.', ref: '2 Corinthians 12:9' },
      { text: 'I am God\'s masterpiece, created anew in Christ Jesus to do good works.', verse: 'For we are God\'s handiwork, created in Christ Jesus to do good works.', ref: 'Ephesians 2:10' },
      { text: 'I cast all my anxiety on God because He cares for me.', verse: 'Cast all your anxiety on him because he cares for you.', ref: '1 Peter 5:7' },
      { text: 'I know that all things work together for good because I love God.', verse: 'And we know that in all things God works for the good of those who love him.', ref: 'Romans 8:28' },
      { text: 'The joy of the Lord is my strength.', verse: 'Do not grieve, for the joy of the Lord is your strength.', ref: 'Nehemiah 8:10' },
      { text: 'I will not be shaken because the Lord is at my right hand.', verse: 'I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.', ref: 'Psalm 16:8' },
      { text: 'In all my ways I acknowledge God and He directs my paths.', verse: 'In all your ways submit to him, and he will make your paths straight.', ref: 'Proverbs 3:6' },
      { text: 'God has plans for me, plans to prosper me and give me hope and a future.', verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you.', ref: 'Jeremiah 29:11' },
      { text: 'I am seated with Christ in the heavenly realms, far above all power and authority.', verse: 'And God raised us up with Christ and seated us with him in the heavenly realms in Christ Jesus.', ref: 'Ephesians 2:6' },
      { text: 'My God shall supply all my needs according to His riches in glory.', verse: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.', ref: 'Philippians 4:19' },
      { text: 'The battle is not mine but the Lord\'s. I stand firm and see His deliverance.', verse: 'You will not have to fight this battle. Take up your positions; stand firm and see the deliverance the Lord will give you.', ref: '2 Chronicles 20:17' },
      { text: 'I am a new creation in Christ. The old has gone and the new has come.', verse: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!', ref: '2 Corinthians 5:17' },
      { text: 'I seek first the kingdom of God and His righteousness, and all things are added to me.', verse: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', ref: 'Matthew 6:33' },
      { text: 'The Lord is near to all who call on Him. I call on Him in truth.', verse: 'The Lord is near to all who call on him, to all who call on him in truth.', ref: 'Psalm 145:18' },
      { text: 'I am chosen by God. He has called me out of darkness into His wonderful light.', verse: 'But you are a chosen people, a royal priesthood, a holy nation.', ref: '1 Peter 2:9' },
      { text: 'Greater is He that is in me than he that is in the world.', verse: 'You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.', ref: '1 John 4:4' },
      { text: 'I put on the full armor of God and stand firm against every scheme of the enemy.', verse: 'Put on the full armor of God, so that you can take your stand against the devil\'s schemes.', ref: 'Ephesians 6:11' },
      { text: 'I commit my way to the Lord and trust in Him. He makes my righteousness shine.', verse: 'Commit your way to the Lord; trust in him and he will do this.', ref: 'Psalm 37:5' },
      { text: 'I wait on the Lord and He renews my strength. I soar on wings like eagles.', verse: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.', ref: 'Isaiah 40:31' },
      { text: 'I delight myself in the Lord and He gives me the desires of my heart.', verse: 'Take delight in the Lord, and he will give you the desires of your heart.', ref: 'Psalm 37:4' },
      { text: 'I do not fear for God is with me. I am not dismayed for He is my God.', verse: 'So do not fear, for I am with you; do not be dismayed, for I am your God.', ref: 'Isaiah 41:10' },
      { text: 'The Lord has given me a spirit of power, love, and self-discipline.', verse: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.', ref: '2 Timothy 1:7' },
      { text: 'I have overcome the world because my faith is in Jesus Christ.', verse: 'For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.', ref: '1 John 5:4' },
      { text: 'Nothing can separate me from the love of God that is in Christ Jesus.', verse: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers will be able to separate us from the love of God.', ref: 'Romans 8:38-39' },
      { text: 'I am hidden with Christ in God. My life is secure in Him.', verse: 'For you died, and your life is now hidden with Christ in God.', ref: 'Colossians 3:3' },
      { text: 'The Lord goes before me and will be with me. He will never leave me nor forsake me.', verse: 'The Lord himself goes before you and will be with you; he will never leave you nor forsake you.', ref: 'Deuteronomy 31:8' },
      { text: 'I am confident that God who started a good work in me will complete it.', verse: 'Being confident of this, that he who began a good work in you will carry it on to completion.', ref: 'Philippians 1:6' },
      { text: 'My steps are ordered by the Lord, and He delights in my way.', verse: 'The Lord makes firm the steps of the one who delights in him.', ref: 'Psalm 37:23' },
      { text: 'God is able to do immeasurably more than I ask or imagine.', verse: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.', ref: 'Ephesians 3:20' },
      { text: 'I am strengthened by the Lord and by His mighty power.', verse: 'Finally, be strong in the Lord and in his mighty power.', ref: 'Ephesians 6:10' },
      { text: 'The peace of God, which transcends all understanding, guards my heart and mind.', verse: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', ref: 'Philippians 4:7' },
      { text: 'I press on toward the goal for the prize of the upward call of God in Christ.', verse: 'I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.', ref: 'Philippians 3:14' },
      { text: 'God\'s mercies are new every morning. Great is His faithfulness.', verse: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.', ref: 'Lamentations 3:22-23' },
      { text: 'I am an heir of God and a co-heir with Christ.', verse: 'Now if we are children, then we are heirs—heirs of God and co-heirs with Christ.', ref: 'Romans 8:17' },
      { text: 'The Lord is my rock, my fortress, and my deliverer.', verse: 'The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.', ref: 'Psalm 18:2' },
      { text: 'I have been given everything I need for life and godliness.', verse: 'His divine power has given us everything we need for a godly life through our knowledge of him.', ref: '2 Peter 1:3' },
      { text: 'I am the righteousness of God in Christ Jesus.', verse: 'God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.', ref: '2 Corinthians 5:21' },
    ],
  },
  financial: {
    themes: [
      { text: 'God supplies all my needs according to His glorious riches in Christ Jesus.', verse: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.', ref: 'Philippians 4:19' },
      { text: 'I am blessed and I am a blessing. Wealth and riches are in my house because of God\'s favor.', verse: 'Wealth and riches are in their houses, and their righteousness endures forever.', ref: 'Psalm 112:3' },
      { text: 'The Lord has given me the power to create wealth and establish His covenant.', verse: 'But remember the Lord your God, for it is he who gives you the ability to produce wealth.', ref: 'Deuteronomy 8:18' },
      { text: 'I am generous and lend freely, and my affairs are conducted with justice.', verse: 'Good will come to those who are generous and lend freely, who conduct their affairs with justice.', ref: 'Psalm 112:5' },
      { text: 'God opens the windows of heaven and pours out blessings that I cannot contain.', verse: 'See if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.', ref: 'Malachi 3:10' },
      { text: 'I honor the Lord with my wealth and my barns will be filled to overflowing.', verse: 'Honor the Lord with your wealth, with the firstfruits of all your crops.', ref: 'Proverbs 3:9' },
      { text: 'The blessing of the Lord brings wealth, without painful toil for it.', verse: 'The blessing of the Lord brings wealth, without painful toil for it.', ref: 'Proverbs 10:22' },
      { text: 'I am planted like a tree by streams of water, and whatever I do prospers.', verse: 'That person is like a tree planted by streams of water, which yields its fruit in season.', ref: 'Psalm 1:3' },
      { text: 'God makes all grace abound to me so that I have all sufficiency in all things.', verse: 'And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.', ref: '2 Corinthians 9:8' },
      { text: 'I sow generously and reap generously. God loves a cheerful giver.', verse: 'Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.', ref: '2 Corinthians 9:6' },
      { text: 'The Lord blesses the work of my hands and I prosper in all that I do.', verse: 'The Lord your God will bless you in all your harvest and in all the work of your hands.', ref: 'Deuteronomy 16:15' },
      { text: 'I seek first the kingdom of God and all things are added unto me.', verse: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', ref: 'Matthew 6:33' },
      { text: 'God has given me the ability to produce wealth so that His covenant may be confirmed.', verse: 'But remember the Lord your God, for it is he who gives you the ability to produce wealth.', ref: 'Deuteronomy 8:18' },
      { text: 'The Lord is my shepherd and I shall not want. He provides abundantly.', verse: 'The Lord is my shepherd, I lack nothing.', ref: 'Psalm 23:1' },
      { text: 'I give and it is given to me, good measure, pressed down, shaken together and running over.', verse: 'Give, and it will be given to you. A good measure, pressed down, shaken together and running over.', ref: 'Luke 6:38' },
      { text: 'My God opens doors of financial opportunity that no one can shut.', verse: 'See, I have placed before you an open door that no one can shut.', ref: 'Revelation 3:8' },
      { text: 'I am the head and not the tail. I am above and not beneath.', verse: 'The Lord will make you the head, not the tail.', ref: 'Deuteronomy 28:13' },
      { text: 'God delights in the prosperity of His servant. I am prospered.', verse: 'Let them shout for joy and be glad, who favor my righteous cause; and let them say continually, Let the Lord be magnified, who has pleasure in the prosperity of His servant.', ref: 'Psalm 35:27' },
      { text: 'I store up treasures in heaven where moth and rust cannot destroy.', verse: 'But store up for yourselves treasures in heaven, where moths and vermin do not destroy.', ref: 'Matthew 6:20' },
      { text: 'I lend to many nations but borrow from none, for I am blessed by God.', verse: 'You will lend to many nations but will borrow from none.', ref: 'Deuteronomy 28:12' },
      { text: 'The Lord enriches me in every way so that I can be generous on every occasion.', verse: 'You will be enriched in every way so that you can be generous on every occasion.', ref: '2 Corinthians 9:11' },
      { text: 'My steps are ordered by the Lord and He establishes my financial path.', verse: 'The Lord makes firm the steps of the one who delights in him.', ref: 'Psalm 37:23' },
      { text: 'I trust God to provide and He never fails to deliver.', verse: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.', ref: 'Philippians 4:19' },
      { text: 'I have learned to be content in all circumstances through Christ who strengthens me.', verse: 'I have learned to be content whatever the circumstances.', ref: 'Philippians 4:11' },
      { text: 'God blesses me to be a channel of blessing to others.', verse: 'I will bless you; I will make your name great, and you will be a blessing.', ref: 'Genesis 12:2' },
      { text: 'The Lord rebukes the devourer for my sake and protects my finances.', verse: 'I will prevent pests from devouring your crops, and the vines in your fields will not drop their fruit before it is ripe.', ref: 'Malachi 3:11' },
      { text: 'I am diligent in my work and the hand of the diligent makes rich.', verse: 'Lazy hands make for poverty, but diligent hands bring wealth.', ref: 'Proverbs 10:4' },
      { text: 'The Lord has blessed me and enlarged my territory.', verse: 'Oh, that you would bless me and enlarge my territory!', ref: '1 Chronicles 4:10' },
      { text: 'God gives seed to the sower and bread for food. He multiplies my resources.', verse: 'Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed.', ref: '2 Corinthians 9:10' },
      { text: 'A faithful person will be richly blessed by God.', verse: 'A faithful person will be richly blessed.', ref: 'Proverbs 28:20' },
      { text: 'I commit my work to the Lord and my plans are established.', verse: 'Commit to the Lord whatever you do, and he will establish your plans.', ref: 'Proverbs 16:3' },
      { text: 'The Lord prospers the work of my hands and establishes me financially.', verse: 'The Lord your God will bless you in all your harvest and in all the work of your hands, and your joy will be complete.', ref: 'Deuteronomy 16:15' },
    ],
  },
  healing: {
    themes: [
      { text: 'By His stripes, I am healed. God\'s healing power flows through every part of my being.', verse: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.', ref: 'Isaiah 53:5' },
      { text: 'The Lord restores my health and heals all my wounds. I am whole in Jesus\' name.', verse: 'But I will restore you to health and heal your wounds, declares the Lord.', ref: 'Jeremiah 30:17' },
      { text: 'God heals all my diseases and redeems my life from the pit.', verse: 'Who forgives all your sins and heals all your diseases.', ref: 'Psalm 103:3' },
      { text: 'I am the Lord who heals you. No sickness shall come near my dwelling.', verse: 'For I am the Lord, who heals you.', ref: 'Exodus 15:26' },
      { text: 'My body is the temple of the Holy Spirit. I am strengthened and renewed daily.', verse: 'Do you not know that your bodies are temples of the Holy Spirit, who is in you?', ref: '1 Corinthians 6:19' },
      { text: 'The prayer of faith shall save the sick, and the Lord shall raise them up.', verse: 'And the prayer offered in faith will make the sick person well; the Lord will raise them up.', ref: 'James 5:15' },
      { text: 'God gives power to the faint and increases strength to those who have no might.', verse: 'He gives strength to the weary and increases the power of the weak.', ref: 'Isaiah 40:29' },
      { text: 'Peace I leave with you; my peace I give you. My heart is not troubled.', verse: 'Peace I leave with you; my peace I give you.', ref: 'John 14:27' },
      { text: 'He sent His word and healed them, and delivered them from their destructions.', verse: 'He sent out his word and healed them; he rescued them from the grave.', ref: 'Psalm 107:20' },
      { text: 'The Lord is my healer. He restores my body, soul, and spirit.', verse: 'Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.', ref: 'Jeremiah 17:14' },
      { text: 'God\'s healing power is at work in me right now, making me whole.', verse: 'But I will restore you to health and heal your wounds, declares the Lord.', ref: 'Jeremiah 30:17' },
      { text: 'I will not die but live, and declare the works of the Lord.', verse: 'I will not die but live, and will proclaim what the Lord has done.', ref: 'Psalm 118:17' },
      { text: 'With long life God satisfies me and shows me His salvation.', verse: 'With long life I will satisfy him and show him my salvation.', ref: 'Psalm 91:16' },
      { text: 'The Lord sustains me on my sickbed and restores me from illness.', verse: 'The Lord sustains them on their sickbed and restores them from their bed of illness.', ref: 'Psalm 41:3' },
      { text: 'God heals the brokenhearted and binds up their wounds.', verse: 'He heals the brokenhearted and binds up their wounds.', ref: 'Psalm 147:3' },
      { text: 'My flesh and heart may fail, but God is the strength of my heart forever.', verse: 'My flesh and my heart may fail, but God is the strength of my heart and my portion forever.', ref: 'Psalm 73:26' },
      { text: 'I lay my hands on the sick and they recover, for God\'s power flows through me.', verse: 'They will place their hands on sick people, and they will get well.', ref: 'Mark 16:18' },
      { text: 'The sun of righteousness rises with healing in its wings.', verse: 'But for you who revere my name, the sun of righteousness will rise with healing in its rays.', ref: 'Malachi 4:2' },
      { text: 'I am being renewed day by day even though my outer self is wasting away.', verse: 'Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day.', ref: '2 Corinthians 4:16' },
      { text: 'God restores my soul and leads me in paths of righteousness for His name\'s sake.', verse: 'He restores my soul. He leads me in paths of righteousness for his name\'s sake.', ref: 'Psalm 23:3' },
      { text: 'A cheerful heart is good medicine. I choose joy and health today.', verse: 'A cheerful heart is good medicine, but a crushed spirit dries up the bones.', ref: 'Proverbs 17:22' },
      { text: 'The Lord will take away all sickness from me.', verse: 'The Lord will keep you free from every disease.', ref: 'Deuteronomy 7:15' },
      { text: 'God is my strength and my shield. My heart trusts in Him and I am healed.', verse: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.', ref: 'Psalm 28:7' },
      { text: 'I receive divine health today. No weapon formed against me shall prosper.', verse: 'No weapon forged against you will prevail.', ref: 'Isaiah 54:17' },
      { text: 'The Spirit of Him who raised Jesus from the dead gives life to my mortal body.', verse: 'And if the Spirit of him who raised Jesus from the dead is living in you, he who raised Christ from the dead will also give life to your mortal bodies.', ref: 'Romans 8:11' },
      { text: 'I prosper and am in good health even as my soul prospers.', verse: 'Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.', ref: '3 John 1:2' },
      { text: 'God gives me rest and refreshment. He renews my strength.', verse: 'Come to me, all you who are weary and burdened, and I will give you rest.', ref: 'Matthew 11:28' },
      { text: 'My body is fearfully and wonderfully made by God.', verse: 'I praise you because I am fearfully and wonderfully made.', ref: 'Psalm 139:14' },
      { text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', verse: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
      { text: 'I cast my burdens on the Lord and He sustains me.', verse: 'Cast your cares on the Lord and he will sustain you.', ref: 'Psalm 55:22' },
      { text: 'God has not given me a spirit of fear but of power, love, and a sound mind.', verse: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.', ref: '2 Timothy 1:7' },
      { text: 'God\'s presence brings healing and wholeness to every area of my life.', verse: 'You will fill me with joy in your presence, with eternal pleasures at your right hand.', ref: 'Psalm 16:11' },
    ],
  },
  purpose: {
    themes: [
      { text: 'God has a purpose for my life. I am His workmanship, created for good works.', verse: 'For we are God\'s handiwork, created in Christ Jesus to do good works.', ref: 'Ephesians 2:10' },
      { text: 'I know the plans God has for me — plans to prosper me and give me hope and a future.', verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.', ref: 'Jeremiah 29:11' },
      { text: 'God called me before I was born. He set me apart and appointed me for His glory.', verse: 'Before I formed you in the womb I knew you, before you were born I set you apart.', ref: 'Jeremiah 1:5' },
      { text: 'I am the light of the world. My life shines brightly for God\'s kingdom.', verse: 'You are the light of the world. A town built on a hill cannot be hidden.', ref: 'Matthew 5:14' },
      { text: 'God works all things together for my good because I love Him.', verse: 'And we know that in all things God works for the good of those who love him.', ref: 'Romans 8:28' },
      { text: 'I press toward the mark for the prize of the high calling of God.', verse: 'I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.', ref: 'Philippians 3:14' },
      { text: 'The steps of a good person are ordered by the Lord.', verse: 'The Lord makes firm the steps of the one who delights in him.', ref: 'Psalm 37:23' },
      { text: 'I am an ambassador for Christ. God makes His appeal through me.', verse: 'We are therefore Christ\'s ambassadors, as though God were making his appeal through us.', ref: '2 Corinthians 5:20' },
      { text: 'God has equipped me with every good thing to do His will.', verse: 'May the God of peace equip you with everything good for doing his will.', ref: 'Hebrews 13:21' },
      { text: 'I am the salt of the earth. My life preserves and flavors the world around me.', verse: 'You are the salt of the earth.', ref: 'Matthew 5:13' },
      { text: 'God has prepared good works in advance for me to walk in.', verse: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.', ref: 'Ephesians 2:10' },
      { text: 'I can do all things through Christ who strengthens me.', verse: 'I can do all this through him who gives me strength.', ref: 'Philippians 4:13' },
      { text: 'God has given me gifts and talents to serve His kingdom.', verse: 'Each of you should use whatever gift you have received to serve others.', ref: '1 Peter 4:10' },
      { text: 'I run the race set before me with endurance, fixing my eyes on Jesus.', verse: 'Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.', ref: 'Hebrews 12:1-2' },
      { text: 'The Lord directs my steps and makes my path clear.', verse: 'In all your ways submit to him, and he will make your paths straight.', ref: 'Proverbs 3:6' },
      { text: 'I am called according to God\'s purpose and nothing can change that.', verse: 'We know that in all things God works for the good of those who love him, who have been called according to his purpose.', ref: 'Romans 8:28' },
      { text: 'For to me, to live is Christ and to die is gain.', verse: 'For to me, to live is Christ and to die is gain.', ref: 'Philippians 1:21' },
      { text: 'God opens doors that no one can shut and shuts doors no one can open.', verse: 'See, I have placed before you an open door that no one can shut.', ref: 'Revelation 3:8' },
      { text: 'I am a vessel of honor, sanctified and useful to the Master.', verse: 'Those who cleanse themselves will be instruments for special purposes, made holy, useful to the Master.', ref: '2 Timothy 2:21' },
      { text: 'God\'s purpose for my life will prevail. His will is perfect.', verse: 'Many are the plans in a person\'s heart, but it is the Lord\'s purpose that prevails.', ref: 'Proverbs 19:21' },
      { text: 'I was created to glorify God and enjoy Him forever.', verse: 'Everyone who is called by my name, whom I created for my glory, whom I formed and made.', ref: 'Isaiah 43:7' },
      { text: 'I commit my plans to the Lord and they will succeed.', verse: 'Commit to the Lord whatever you do, and he will establish your plans.', ref: 'Proverbs 16:3' },
      { text: 'The Lord has anointed me to bring good news to the poor and freedom to the captives.', verse: 'The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor.', ref: 'Luke 4:18' },
      { text: 'I am a royal priesthood, called to declare the praises of God.', verse: 'But you are a chosen people, a royal priesthood, a holy nation.', ref: '1 Peter 2:9' },
      { text: 'God\'s word is a lamp to my feet and a light to my path.', verse: 'Your word is a lamp for my feet, a light on my path.', ref: 'Psalm 119:105' },
      { text: 'I bear fruit that will last because I abide in Christ.', verse: 'You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.', ref: 'John 15:16' },
      { text: 'God has given me everything I need for life and godliness.', verse: 'His divine power has given us everything we need for a godly life.', ref: '2 Peter 1:3' },
      { text: 'I am fearfully and wonderfully made with a unique purpose.', verse: 'I praise you because I am fearfully and wonderfully made.', ref: 'Psalm 139:14' },
      { text: 'Where the Spirit of the Lord is, there is freedom to fulfill my purpose.', verse: 'Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom.', ref: '2 Corinthians 3:17' },
      { text: 'I am a co-laborer with God, working together for His kingdom.', verse: 'For we are co-workers in God\'s service; you are God\'s field, God\'s building.', ref: '1 Corinthians 3:9' },
      { text: 'The Lord fulfills His purpose for me. His love endures forever.', verse: 'The Lord will vindicate me; your love, Lord, endures forever.', ref: 'Psalm 138:8' },
      { text: 'I am being transformed from glory to glory by the Spirit of the Lord.', verse: 'And we all, who with unveiled faces contemplate the Lord\'s glory, are being transformed into his image with ever-increasing glory.', ref: '2 Corinthians 3:18' },
    ],
  },
  discipline: {
    themes: [
      { text: 'I discipline my body and keep it under control, so that I may not be disqualified.', verse: 'No, I strike a blow to my body and make it my slave so that after I have preached to others, I myself will not be disqualified for the prize.', ref: '1 Corinthians 9:27' },
      { text: 'I set my mind on things above, not on earthly things.', verse: 'Set your minds on things above, not on earthly things.', ref: 'Colossians 3:2' },
      { text: 'I run the race marked out for me with perseverance, fixing my eyes on Jesus.', verse: 'Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.', ref: 'Hebrews 12:1-2' },
      { text: 'The fruit of the Spirit produces self-control in me.', verse: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.', ref: 'Galatians 5:22-23' },
      { text: 'I delight in God\'s law and meditate on it day and night.', verse: 'But whose delight is in the law of the Lord, and who meditates on his law day and night.', ref: 'Psalm 1:2' },
      { text: 'I can do all things through Christ who gives me strength.', verse: 'I can do all this through him who gives me strength.', ref: 'Philippians 4:13' },
      { text: 'The steadfast love of the Lord never ceases. His mercies are new every morning.', verse: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail.', ref: 'Lamentations 3:22-23' },
      { text: 'I commit my way to the Lord and trust in Him.', verse: 'Commit your way to the Lord; trust in him and he will do this.', ref: 'Psalm 37:5' },
      { text: 'I take every thought captive and make it obedient to Christ.', verse: 'We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ.', ref: '2 Corinthians 10:5' },
      { text: 'No temptation has overtaken me that is not common to man. God provides a way of escape.', verse: 'No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.', ref: '1 Corinthians 10:13' },
      { text: 'I put off the old self and put on the new self, created in the likeness of God.', verse: 'To put off your old self and to put on the new self, created to be like God in true righteousness and holiness.', ref: 'Ephesians 4:22-24' },
      { text: 'I do not grow weary in doing good, for in due season I will reap.', verse: 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.', ref: 'Galatians 6:9' },
      { text: 'I am transformed by the renewing of my mind.', verse: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.', ref: 'Romans 12:2' },
      { text: 'I guard my heart with all diligence, for from it flow the springs of life.', verse: 'Above all else, guard your heart, for everything you do flows from it.', ref: 'Proverbs 4:23' },
      { text: 'I endure hardship as discipline, for God disciplines those He loves.', verse: 'Endure hardship as discipline; God is treating you as his children.', ref: 'Hebrews 12:7' },
      { text: 'I am sober-minded and watchful, for my adversary prowls around like a roaring lion.', verse: 'Be alert and of sober mind. Your enemy the devil prowls around like a roaring lion looking for someone to devour.', ref: '1 Peter 5:8' },
      { text: 'I resist the devil and he flees from me. I draw near to God.', verse: 'Submit yourselves, then, to God. Resist the devil, and he will flee from you.', ref: 'James 4:7' },
      { text: 'I walk by the Spirit and do not gratify the desires of the flesh.', verse: 'So I say, walk by the Spirit, and you will not gratify the desires of the flesh.', ref: 'Galatians 5:16' },
      { text: 'God\'s word I have hidden in my heart so that I might not sin against Him.', verse: 'I have hidden your word in my heart that I might not sin against you.', ref: 'Psalm 119:11' },
      { text: 'I am diligent in presenting myself approved to God, a worker who does not need to be ashamed.', verse: 'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed.', ref: '2 Timothy 2:15' },
      { text: 'I run to win the prize. I train my body and make it my servant.', verse: 'Do you not know that in a race all the runners run, but only one gets the prize? Run in such a way as to get the prize.', ref: '1 Corinthians 9:24' },
      { text: 'I make the most of every opportunity because the days are evil.', verse: 'Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity.', ref: 'Ephesians 5:15-16' },
      { text: 'I wait patiently for the Lord. He turns to me and hears my cry.', verse: 'I waited patiently for the Lord; he turned to me and heard my cry.', ref: 'Psalm 40:1' },
      { text: 'I put on the whole armor of God and stand firm in faith.', verse: 'Put on the full armor of God, so that you can take your stand against the devil\'s schemes.', ref: 'Ephesians 6:11' },
      { text: 'I press on toward the goal for the prize of the upward call of God.', verse: 'I press on toward the goal to win the prize for which God has called me heavenward.', ref: 'Philippians 3:14' },
      { text: 'The testing of my faith produces perseverance, and perseverance must finish its work.', verse: 'Because you know that the testing of your faith produces perseverance.', ref: 'James 1:3' },
      { text: 'I count it all joy when I face trials, knowing they develop my character.', verse: 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds.', ref: 'James 1:2' },
      { text: 'I fix my eyes on Jesus, the author and perfecter of my faith.', verse: 'Fixing our eyes on Jesus, the pioneer and perfecter of faith.', ref: 'Hebrews 12:2' },
      { text: 'I persevere under trial because when I stand the test I will receive the crown of life.', verse: 'Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.', ref: 'James 1:12' },
      { text: 'I deny ungodliness and live self-controlled, upright, and godly lives.', verse: 'It teaches us to say No to ungodliness and worldly passions, and to live self-controlled, upright and godly lives.', ref: 'Titus 2:12' },
      { text: 'I fight the good fight of faith and take hold of the eternal life to which I was called.', verse: 'Fight the good fight of the faith. Take hold of the eternal life to which you were called.', ref: '1 Timothy 6:12' },
      { text: 'I am steadfast, immovable, always abounding in the work of the Lord.', verse: 'Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord.', ref: '1 Corinthians 15:58' },
    ],
  },
  leadership: {
    themes: [
      { text: 'God has anointed me to lead with wisdom, integrity, and a servant\'s heart.', verse: 'The greatest among you will be your servant.', ref: 'Matthew 23:11' },
      { text: 'I lead others with the same mind that was in Christ Jesus — humble and obedient.', verse: 'In your relationships with one another, have the same mindset as Christ Jesus.', ref: 'Philippians 2:5' },
      { text: 'The Lord gives me wisdom and from His mouth come knowledge and understanding.', verse: 'For the Lord gives wisdom; from his mouth come knowledge and understanding.', ref: 'Proverbs 2:6' },
      { text: 'I am strong and courageous. The Lord my God goes with me wherever I go.', verse: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', ref: 'Joshua 1:9' },
      { text: 'Where there is no vision, people perish. God has given me vision for His purposes.', verse: 'Where there is no revelation, people cast off restraint.', ref: 'Proverbs 29:18' },
      { text: 'I shepherd those God has placed in my care with integrity and skillful hands.', verse: 'And David shepherded them with integrity of heart; with skillful hands he led them.', ref: 'Psalm 78:72' },
      { text: 'Iron sharpens iron. I surround myself with wise counsel and build others up.', verse: 'As iron sharpens iron, so one person sharpens another.', ref: 'Proverbs 27:17' },
      { text: 'I have been given authority to overcome all the power of the enemy.', verse: 'I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy.', ref: 'Luke 10:19' },
      { text: 'I seek wisdom from above, which is pure, peaceable, gentle, and full of mercy.', verse: 'But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit.', ref: 'James 3:17' },
      { text: 'I lead by example, being a pattern of good works in all things.', verse: 'In everything set them an example by doing what is good.', ref: 'Titus 2:7' },
      { text: 'God has placed me in a position of influence for such a time as this.', verse: 'And who knows but that you have come to your royal position for such a time as this?', ref: 'Esther 4:14' },
      { text: 'I speak the truth in love, growing up into Him who is the head — Christ.', verse: 'Instead, speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.', ref: 'Ephesians 4:15' },
      { text: 'The Lord is my shepherd and I follow His lead in all things.', verse: 'The Lord is my shepherd, I lack nothing.', ref: 'Psalm 23:1' },
      { text: 'I have the mind of Christ and lead with divine understanding.', verse: 'But we have the mind of Christ.', ref: '1 Corinthians 2:16' },
      { text: 'I equip the saints for the work of ministry and build up the body of Christ.', verse: 'To equip his people for works of service, so that the body of Christ may be built up.', ref: 'Ephesians 4:12' },
      { text: 'I am a servant leader, washing the feet of those I serve.', verse: 'Now that I, your Lord and Teacher, have washed your feet, you also should wash one another\'s feet.', ref: 'John 13:14' },
      { text: 'God gives me strength to lead boldly and courage to stand firm.', verse: 'Be on your guard; stand firm in the faith; be courageous; be strong.', ref: '1 Corinthians 16:13' },
      { text: 'I cast my vision before the people and lead them toward God\'s purpose.', verse: 'Write down the revelation and make it plain on tablets so that a herald may run with it.', ref: 'Habakkuk 2:2' },
      { text: 'I lead with justice and righteousness, reflecting God\'s character.', verse: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.', ref: 'Micah 6:8' },
      { text: 'I train up others in the way they should go, investing in the next generation.', verse: 'Start children off on the way they should go, and even when they are old they will not turn from it.', ref: 'Proverbs 22:6' },
      { text: 'I am faithful in little things so that God entrusts me with greater things.', verse: 'Whoever can be trusted with very little can also be trusted with much.', ref: 'Luke 16:10' },
      { text: 'I do nothing out of selfish ambition but consider others better than myself.', verse: 'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.', ref: 'Philippians 2:3' },
      { text: 'The Lord anoints my head with oil. My cup overflows with His blessing.', verse: 'You anoint my head with oil; my cup overflows.', ref: 'Psalm 23:5' },
      { text: 'I am a good steward of the gifts and resources God has given me.', verse: 'Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace.', ref: '1 Peter 4:10' },
      { text: 'I make disciples of all nations, teaching them to obey all that Christ commanded.', verse: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.', ref: 'Matthew 28:19' },
      { text: 'I walk in integrity and my steps are established by the Lord.', verse: 'The integrity of the upright guides them.', ref: 'Proverbs 11:3' },
      { text: 'I am bold as a lion because my righteousness comes from God.', verse: 'The wicked flee though no one pursues, but the righteous are as bold as a lion.', ref: 'Proverbs 28:1' },
      { text: 'I influence others by my godly example, not by force or manipulation.', verse: 'Not lording it over those entrusted to you, but being examples to the flock.', ref: '1 Peter 5:3' },
      { text: 'God has given me wisdom to make sound decisions and lead with clarity.', verse: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.', ref: 'James 1:5' },
      { text: 'I bear much fruit because I remain connected to the true vine — Jesus Christ.', verse: 'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.', ref: 'John 15:5' },
      { text: 'I guard my character because it is the foundation of my influence.', verse: 'Above all else, guard your heart, for everything you do flows from it.', ref: 'Proverbs 4:23' },
      { text: 'I am called to lead with excellence, reflecting the glory of God.', verse: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.', ref: 'Colossians 3:23' },
    ],
  },
  hope: {
    themes: [
      { text: 'My hope is built on nothing less than Jesus\' blood and righteousness.', verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', ref: 'Jeremiah 29:11' },
      { text: 'I wait on the Lord and He renews my strength. I soar on wings like eagles.', verse: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.', ref: 'Isaiah 40:31' },
      { text: 'The God of hope fills me with all joy and peace as I trust in Him.', verse: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.', ref: 'Romans 15:13' },
      { text: 'I have a living hope through the resurrection of Jesus Christ from the dead.', verse: 'Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ.', ref: '1 Peter 1:3' },
      { text: 'Hope does not put me to shame because God\'s love has been poured into my heart.', verse: 'And hope does not put us to shame, because God\'s love has been poured out into our hearts through the Holy Spirit.', ref: 'Romans 5:5' },
      { text: 'I hold fast to the hope set before me, which is an anchor for my soul.', verse: 'We have this hope as an anchor for the soul, firm and secure.', ref: 'Hebrews 6:19' },
      { text: 'The Lord is my portion. Therefore I have hope in Him.', verse: 'I say to myself, The Lord is my portion; therefore I will wait for him.', ref: 'Lamentations 3:24' },
      { text: 'I am confident in this: I will see the goodness of the Lord in the land of the living.', verse: 'I remain confident of this: I will see the goodness of the Lord in the land of the living.', ref: 'Psalm 27:13' },
      { text: 'My hope is in the Lord who made heaven and earth.', verse: 'My help comes from the Lord, the Maker of heaven and earth.', ref: 'Psalm 121:2' },
      { text: 'God gives me hope and a future. His plans for me are good.', verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you.', ref: 'Jeremiah 29:11' },
      { text: 'I rejoice in hope, am patient in tribulation, and continue steadfastly in prayer.', verse: 'Be joyful in hope, patient in affliction, faithful in prayer.', ref: 'Romans 12:12' },
      { text: 'Even in the valley of the shadow of death, I will fear no evil for God is with me.', verse: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me.', ref: 'Psalm 23:4' },
      { text: 'Weeping may endure for a night, but joy comes in the morning.', verse: 'For his anger lasts only a moment, but his favor lasts a lifetime; weeping may stay for the night, but rejoicing comes in the morning.', ref: 'Psalm 30:5' },
      { text: 'God is able to do immeasurably more than all I ask or imagine.', verse: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.', ref: 'Ephesians 3:20' },
      { text: 'I press on because Christ Jesus has made me His own.', verse: 'I press on to take hold of that for which Christ Jesus took hold of me.', ref: 'Philippians 3:12' },
      { text: 'The Lord is near. I do not need to be anxious about anything.', verse: 'The Lord is near. Do not be anxious about anything.', ref: 'Philippians 4:5-6' },
      { text: 'I look forward with hope to what God has prepared for those who love Him.', verse: 'What no eye has seen, what no ear has heard, and what no human mind has conceived—the things God has prepared for those who love him.', ref: '1 Corinthians 2:9' },
      { text: 'God is faithful. He will not let me be tempted beyond what I can bear.', verse: 'God is faithful; he will not let you be tempted beyond what you can bear.', ref: '1 Corinthians 10:13' },
      { text: 'My light and momentary troubles are achieving an eternal glory that far outweighs them all.', verse: 'For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all.', ref: '2 Corinthians 4:17' },
      { text: 'The Lord restores what the locusts have eaten. He makes all things new.', verse: 'I will repay you for the years the locusts have eaten.', ref: 'Joel 2:25' },
      { text: 'I put my hope in God\'s unfailing love, which endures forever.', verse: 'But I trust in your unfailing love; my heart rejoices in your salvation.', ref: 'Psalm 13:5' },
      { text: 'My soul finds rest in God alone. My hope comes from Him.', verse: 'Yes, my soul, find rest in God; my hope comes from him.', ref: 'Psalm 62:5' },
      { text: 'God turns my mourning into dancing and my sorrow into joy.', verse: 'You turned my wailing into dancing; you removed my sackcloth and clothed me with joy.', ref: 'Psalm 30:11' },
      { text: 'I will not lose heart because inwardly I am being renewed day by day.', verse: 'Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day.', ref: '2 Corinthians 4:16' },
      { text: 'The Lord will make a way where there seems to be no way.', verse: 'See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.', ref: 'Isaiah 43:19' },
      { text: 'God is my ever-present help in trouble. I will not fear.', verse: 'God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear.', ref: 'Psalm 46:1-2' },
      { text: 'I set my hope fully on the grace that will be brought to me at the revelation of Jesus Christ.', verse: 'Therefore, with minds that are alert and fully sober, set your hope on the grace to be brought to you when Jesus Christ is revealed at his coming.', ref: '1 Peter 1:13' },
      { text: 'The Lord will complete what He has started in my life.', verse: 'Being confident of this, that he who began a good work in you will carry it on to completion.', ref: 'Philippians 1:6' },
      { text: 'I know that my Redeemer lives, and in the end He will stand upon the earth.', verse: 'I know that my redeemer lives, and that in the end he will stand on the earth.', ref: 'Job 19:25' },
      { text: 'The Lord is good to those who wait for Him, to the soul that seeks Him.', verse: 'The Lord is good to those whose hope is in him, to the one who seeks him.', ref: 'Lamentations 3:25' },
      { text: 'I am blessed because I trust in the Lord. My confidence is in Him.', verse: 'But blessed is the one who trusts in the Lord, whose confidence is in him.', ref: 'Jeremiah 17:7' },
      { text: 'No eye has seen and no ear has heard the wonderful things God has prepared for me.', verse: 'What no eye has seen, what no ear has heard, the things God has prepared for those who love him.', ref: '1 Corinthians 2:9' },
    ],
  },
  grace: {
    themes: [
      { text: 'By grace I have been saved through faith. It is the gift of God.', verse: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.', ref: 'Ephesians 2:8' },
      { text: 'God\'s grace is sufficient for me. His power is made perfect in my weakness.', verse: 'But he said to me, My grace is sufficient for you, for my power is made perfect in weakness.', ref: '2 Corinthians 12:9' },
      { text: 'Where sin increased, grace increased all the more.', verse: 'But where sin increased, grace increased all the more.', ref: 'Romans 5:20' },
      { text: 'I approach God\'s throne of grace with confidence to receive mercy and find grace.', verse: 'Let us then approach God\'s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.', ref: 'Hebrews 4:16' },
      { text: 'The grace of the Lord Jesus Christ is with my spirit.', verse: 'The grace of the Lord Jesus Christ be with your spirit.', ref: 'Philippians 4:23' },
      { text: 'God is able to make all grace abound to me in all things at all times.', verse: 'And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.', ref: '2 Corinthians 9:8' },
      { text: 'I am what I am by the grace of God. His grace toward me was not in vain.', verse: 'But by the grace of God I am what I am, and his grace to me was not without effect.', ref: '1 Corinthians 15:10' },
      { text: 'The Lord gives grace and glory. No good thing does He withhold from me.', verse: 'For the Lord God is a sun and shield; the Lord bestows favor and honor; no good thing does he withhold from those whose walk is blameless.', ref: 'Psalm 84:11' },
      { text: 'Grace and peace are mine in abundance through the knowledge of God.', verse: 'Grace and peace be yours in abundance through the knowledge of God and of Jesus our Lord.', ref: '2 Peter 1:2' },
      { text: 'God\'s grace teaches me to say no to ungodliness and live uprightly.', verse: 'For the grace of God has appeared that offers salvation to all people. It teaches us to say No to ungodliness.', ref: 'Titus 2:11-12' },
      { text: 'I am justified freely by God\'s grace through the redemption in Christ Jesus.', verse: 'And all are justified freely by his grace through the redemption that came by Christ Jesus.', ref: 'Romans 3:24' },
      { text: 'From His fullness I have received grace upon grace.', verse: 'Out of his fullness we have all received grace in place of grace already given.', ref: 'John 1:16' },
      { text: 'God chose me before the foundation of the world according to His grace.', verse: 'For he chose us in him before the creation of the world to be holy and blameless in his sight.', ref: 'Ephesians 1:4' },
      { text: 'I extend grace to others as God has generously extended grace to me.', verse: 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.', ref: 'Ephesians 4:32' },
      { text: 'God\'s grace is the foundation of my salvation and my daily walk.', verse: 'For it is by grace you have been saved, through faith.', ref: 'Ephesians 2:8' },
      { text: 'I am not under law but under grace. Sin shall not be my master.', verse: 'For sin shall no longer be your master, because you are not under the law, but under grace.', ref: 'Romans 6:14' },
      { text: 'The Lord is gracious and compassionate, slow to anger and rich in love.', verse: 'The Lord is gracious and compassionate, slow to anger and rich in love.', ref: 'Psalm 145:8' },
      { text: 'I grow in the grace and knowledge of our Lord and Savior Jesus Christ.', verse: 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ.', ref: '2 Peter 3:18' },
      { text: 'God\'s favor surrounds me like a shield. His grace goes before me.', verse: 'Surely, Lord, you bless the righteous; you surround them with your favor as with a shield.', ref: 'Psalm 5:12' },
      { text: 'There is now no condemnation for me because I am in Christ Jesus.', verse: 'Therefore, there is now no condemnation for those who are in Christ Jesus.', ref: 'Romans 8:1' },
      { text: 'God has lavished His grace on me with all wisdom and understanding.', verse: 'Which he lavished on us. With all wisdom and understanding.', ref: 'Ephesians 1:8' },
      { text: 'I have been redeemed through His blood, the forgiveness of sins according to His grace.', verse: 'In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\'s grace.', ref: 'Ephesians 1:7' },
      { text: 'God gives more grace. He opposes the proud but shows favor to the humble.', verse: 'But he gives us more grace. That is why Scripture says: God opposes the proud but shows favor to the humble.', ref: 'James 4:6' },
      { text: 'His grace is new every morning. I receive fresh grace for today.', verse: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning.', ref: 'Lamentations 3:22-23' },
      { text: 'I am accepted in the Beloved through God\'s amazing grace.', verse: 'To the praise of his glorious grace, which he has freely given us in the One he loves.', ref: 'Ephesians 1:6' },
      { text: 'God\'s grace empowers me to do what I cannot do in my own strength.', verse: 'But by the grace of God I am what I am, and his grace to me was not without effect.', ref: '1 Corinthians 15:10' },
      { text: 'I am clothed in the garments of salvation and wrapped in the robe of righteousness.', verse: 'I delight greatly in the Lord; my soul rejoices in my God. For he has clothed me with garments of salvation and arrayed me in a robe of his righteousness.', ref: 'Isaiah 61:10' },
      { text: 'As far as the east is from the west, God has removed my transgressions from me.', verse: 'As far as the east is from the west, so far has he removed our transgressions from us.', ref: 'Psalm 103:12' },
      { text: 'If I confess my sins, God is faithful to forgive me and cleanse me.', verse: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.', ref: '1 John 1:9' },
      { text: 'God shows His love for me in that while I was still a sinner, Christ died for me.', verse: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.', ref: 'Romans 5:8' },
      { text: 'I am a new creation. The old has passed away and the new has come by grace.', verse: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!', ref: '2 Corinthians 5:17' },
      { text: 'My sins are forgiven for His name\'s sake. I walk in freedom.', verse: 'I am writing to you, dear children, because your sins have been forgiven on account of his name.', ref: '1 John 2:12' },
    ],
  },
  encouragement: {
    themes: [
      { text: 'Be strong and courageous! The Lord my God is with me wherever I go.', verse: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', ref: 'Joshua 1:9' },
      { text: 'I am more than a conqueror through Him who loved me.', verse: 'No, in all these things we are more than conquerors through him who loved us.', ref: 'Romans 8:37' },
      { text: 'When I am weak, then I am strong, because God\'s power rests on me.', verse: 'For when I am weak, then I am strong.', ref: '2 Corinthians 12:10' },
      { text: 'God is working all things for my good. Nothing is wasted in His hands.', verse: 'And we know that in all things God works for the good of those who love him.', ref: 'Romans 8:28' },
      { text: 'I will not be afraid because the Lord stands with me and strengthens me.', verse: 'But the Lord stood at my side and gave me strength.', ref: '2 Timothy 4:17' },
      { text: 'The Lord will fight for me. I need only to be still and trust.', verse: 'The Lord will fight for you; you need only to be still.', ref: 'Exodus 14:14' },
      { text: 'I can do all things through Christ who gives me strength.', verse: 'I can do all this through him who gives me strength.', ref: 'Philippians 4:13' },
      { text: 'God has not given me a spirit of fear, but of power and love and a sound mind.', verse: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.', ref: '2 Timothy 1:7' },
      { text: 'I will be strong in the Lord and in His mighty power.', verse: 'Finally, be strong in the Lord and in his mighty power.', ref: 'Ephesians 6:10' },
      { text: 'The Lord is my strength and my song. He has become my salvation.', verse: 'The Lord is my strength and my defense; he has become my salvation.', ref: 'Exodus 15:2' },
      { text: 'I do not lose heart. God renews me inwardly day by day.', verse: 'Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day.', ref: '2 Corinthians 4:16' },
      { text: 'The Lord is close to me when my heart is broken. He saves my crushed spirit.', verse: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
      { text: 'God comforts me in all my troubles so I can comfort others.', verse: 'Who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.', ref: '2 Corinthians 1:4' },
      { text: 'I will not grow weary in doing good. At the proper time I will reap a harvest.', verse: 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.', ref: 'Galatians 6:9' },
      { text: 'God gives strength to the weary and increases the power of the weak.', verse: 'He gives strength to the weary and increases the power of the weak.', ref: 'Isaiah 40:29' },
      { text: 'My God shall supply all my needs. He is always faithful.', verse: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.', ref: 'Philippians 4:19' },
      { text: 'The joy of the Lord is my strength, even in difficult seasons.', verse: 'Do not grieve, for the joy of the Lord is your strength.', ref: 'Nehemiah 8:10' },
      { text: 'I cast all my anxiety on God because He cares deeply for me.', verse: 'Cast all your anxiety on him because he cares for you.', ref: '1 Peter 5:7' },
      { text: 'God is my refuge and strength. I will not be shaken.', verse: 'God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear.', ref: 'Psalm 46:1-2' },
      { text: 'I am never alone. God is with me always, even to the end of the age.', verse: 'And surely I am with you always, to the very end of the age.', ref: 'Matthew 28:20' },
      { text: 'The Lord lifts me up when I fall. He sustains me with His hand.', verse: 'Though he may stumble, he will not fall, for the Lord upholds him with his hand.', ref: 'Psalm 37:24' },
      { text: 'I will be anxious for nothing. God\'s peace guards my heart and mind.', verse: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', ref: 'Philippians 4:6' },
      { text: 'God has plans to prosper me and not to harm me. My future is secure in Him.', verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', ref: 'Jeremiah 29:11' },
      { text: 'No weapon formed against me shall prosper. God is my defender.', verse: 'No weapon forged against you will prevail.', ref: 'Isaiah 54:17' },
      { text: 'I take courage because Jesus has overcome the world.', verse: 'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.', ref: 'John 16:33' },
      { text: 'God is able to do far more than I can ask or think.', verse: 'Now to him who is able to do immeasurably more than all we ask or imagine.', ref: 'Ephesians 3:20' },
      { text: 'The battle belongs to the Lord. I stand firm and see His deliverance.', verse: 'You will not have to fight this battle. Take up your positions; stand firm and see the deliverance the Lord will give you.', ref: '2 Chronicles 20:17' },
      { text: 'I am precious in God\'s sight. He loves me and I am honored.', verse: 'Since you are precious and honored in my sight, and because I love you.', ref: 'Isaiah 43:4' },
      { text: 'God\'s faithfulness reaches to the skies. His love never fails.', verse: 'Your faithfulness reaches to the skies.', ref: 'Psalm 36:5' },
      { text: 'I am encouraged because God who promised is faithful.', verse: 'Let us hold unswervingly to the hope we profess, for he who promised is faithful.', ref: 'Hebrews 10:23' },
      { text: 'When I pass through deep waters, God will be with me. I will not be overwhelmed.', verse: 'When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.', ref: 'Isaiah 43:2' },
      { text: 'The God of all comfort comforts me so I can comfort others.', verse: 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort.', ref: '2 Corinthians 1:3' },
    ],
  },
  love: {
    themes: [
      { text: 'God so loved the world that He gave His only Son. I am loved beyond measure.', verse: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', ref: 'John 3:16' },
      { text: 'Nothing can separate me from the love of God in Christ Jesus.', verse: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God.', ref: 'Romans 8:38-39' },
      { text: 'God\'s love has been poured into my heart through the Holy Spirit.', verse: 'God\'s love has been poured out into our hearts through the Holy Spirit, who has been given to us.', ref: 'Romans 5:5' },
      { text: 'I love because God first loved me. His love inspires mine.', verse: 'We love because he first loved us.', ref: '1 John 4:19' },
      { text: 'God demonstrates His love for me: while I was still a sinner, Christ died for me.', verse: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.', ref: 'Romans 5:8' },
      { text: 'The Lord\'s love for me is everlasting. He has drawn me with unfailing kindness.', verse: 'I have loved you with an everlasting love; I have drawn you with unfailing kindness.', ref: 'Jeremiah 31:3' },
      { text: 'Love is patient, love is kind. God\'s love in me never fails.', verse: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.', ref: '1 Corinthians 13:4' },
      { text: 'I am rooted and established in love, and I grasp how wide and long and high and deep is Christ\'s love.', verse: 'And I pray that you, being rooted and established in love, may have power to grasp how wide and long and high and deep is the love of Christ.', ref: 'Ephesians 3:17-18' },
      { text: 'See what great love the Father has lavished on me, that I should be called a child of God.', verse: 'See what great love the Father has lavished on us, that we should be called children of God!', ref: '1 John 3:1' },
      { text: 'God is love. Whoever lives in love lives in God, and God in them.', verse: 'God is love. Whoever lives in love lives in God, and God in them.', ref: '1 John 4:16' },
      { text: 'Above all, I clothe myself with love, which binds everything together in perfect harmony.', verse: 'And over all these virtues put on love, which binds them all together in perfect unity.', ref: 'Colossians 3:14' },
      { text: 'There is no fear in love. God\'s perfect love drives out all my fear.', verse: 'There is no fear in love. But perfect love drives out fear.', ref: '1 John 4:18' },
      { text: 'The greatest commandment is to love the Lord with all my heart, soul, and mind.', verse: 'Love the Lord your God with all your heart and with all your soul and with all your mind.', ref: 'Matthew 22:37' },
      { text: 'I love my neighbor as myself, fulfilling the royal law of God.', verse: 'The second is this: Love your neighbor as yourself.', ref: 'Mark 12:31' },
      { text: 'Greater love has no one than this: to lay down one\'s life for friends.', verse: 'Greater love has no one than this: to lay down one\'s life for one\'s friends.', ref: 'John 15:13' },
      { text: 'The Lord delights in me. He quiets me with His love and rejoices over me with singing.', verse: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.', ref: 'Zephaniah 3:17' },
      { text: 'I am precious and honored in God\'s sight because He loves me.', verse: 'Since you are precious and honored in my sight, and because I love you.', ref: 'Isaiah 43:4' },
      { text: 'God crowns me with love and compassion. He satisfies my desires with good things.', verse: 'Who crowns you with love and compassion, who satisfies your desires with good things.', ref: 'Psalm 103:4-5' },
      { text: 'I walk in love just as Christ loved me and gave Himself up for me.', verse: 'Walk in the way of love, just as Christ loved us and gave himself up for us as a fragrant offering and sacrifice to God.', ref: 'Ephesians 5:2' },
      { text: 'God\'s steadfast love never ceases and His mercies never come to an end.', verse: 'The steadfast love of the Lord never ceases; his mercies never come to an end.', ref: 'Lamentations 3:22' },
      { text: 'I am beloved by God. He chose me and set His affection on me.', verse: 'The Lord did not set his affection on you and choose you because you were more numerous than other peoples, for you were the fewest of all peoples. But it was because the Lord loved you.', ref: 'Deuteronomy 7:7-8' },
      { text: 'Love never fails. It always protects, always trusts, always hopes, always perseveres.', verse: 'Love never fails. It always protects, always trusts, always hopes, always perseveres.', ref: '1 Corinthians 13:7-8' },
      { text: 'The love of Christ compels me to live no longer for myself but for Him.', verse: 'For Christ\'s love compels us, because we are convinced that one died for all.', ref: '2 Corinthians 5:14' },
      { text: 'God\'s love is better than life. My lips glorify Him.', verse: 'Because your love is better than life, my lips will glorify you.', ref: 'Psalm 63:3' },
      { text: 'I keep myself in the love of God, looking for the mercy of Jesus Christ.', verse: 'Keep yourselves in God\'s love as you wait for the mercy of our Lord Jesus Christ to bring you to eternal life.', ref: 'Jude 1:21' },
      { text: 'God will never stop loving me. His love endures forever.', verse: 'Give thanks to the Lord, for he is good. His love endures forever.', ref: 'Psalm 136:1' },
      { text: 'How precious is God\'s unfailing love! I find refuge in the shadow of His wings.', verse: 'How priceless is your unfailing love, O God! People take refuge in the shadow of your wings.', ref: 'Psalm 36:7' },
      { text: 'I love others deeply from the heart because love covers a multitude of sins.', verse: 'Above all, love each other deeply, because love covers over a multitude of sins.', ref: '1 Peter 4:8' },
      { text: 'God loved me and sent His Son as an atoning sacrifice for my sins.', verse: 'This is love: not that we loved God, but that he loved us and sent his Son as an atoning sacrifice for our sins.', ref: '1 John 4:10' },
      { text: 'If I have faith to move mountains but have not love, I am nothing. Love is everything.', verse: 'If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but do not have love, I am nothing.', ref: '1 Corinthians 13:2' },
      { text: 'These three remain: faith, hope, and love. But the greatest of these is love.', verse: 'And now these three remain: faith, hope and love. But the greatest of these is love.', ref: '1 Corinthians 13:13' },
      { text: 'I am God\'s beloved. He sings songs of deliverance over me.', verse: 'You are my hiding place; you will protect me from trouble and surround me with songs of deliverance.', ref: 'Psalm 32:7' },
    ],
  },
};

function generateAffirmations() {
  const allAffirmations = [];

  for (const [categoryKey, categoryData] of Object.entries(categories)) {
    const themes = categoryData.themes;
    const prefix = categoryKey === 'financial' ? 'fn' :
                   categoryKey === 'healing' ? 'he' :
                   categoryKey === 'purpose' ? 'pu' :
                   categoryKey === 'discipline' ? 'di' :
                   categoryKey === 'leadership' ? 'le' :
                   categoryKey === 'hope' ? 'ho' :
                   categoryKey === 'grace' ? 'gr' :
                   categoryKey === 'encouragement' ? 'en' :
                   categoryKey === 'love' ? 'lo' :
                   'fa';

    for (let day = 1; day <= 366; day++) {
      const themeIndex = (day - 1) % themes.length;
      const theme = themes[themeIndex];
      const cycle = Math.floor((day - 1) / themes.length);

      let text = theme.text;
      let verse = theme.verse;
      let verseRef = theme.ref;

      if (cycle > 0) {
        const dayPrefixes = [
          'Today I declare: ',
          'I stand firm knowing: ',
          'I speak over my life: ',
          'My heart proclaims: ',
          'I confess boldly: ',
          'With confidence I say: ',
          'I believe and declare: ',
          'I hold onto this truth: ',
          'My spirit declares: ',
          'I receive this word: ',
          'In faith I affirm: ',
        ];
        const prefixText = dayPrefixes[cycle % dayPrefixes.length];
        text = prefixText + text.charAt(0).toLowerCase() + text.slice(1);
      }

      allAffirmations.push({
        id: `${prefix}${day}`,
        day,
        text,
        verse,
        verseRef,
        category: categoryKey,
      });
    }
  }

  return allAffirmations;
}

const affirmations = generateAffirmations();

let output = `export type Category = 'faith' | 'financial' | 'healing' | 'purpose' | 'discipline' | 'leadership' | 'hope' | 'grace' | 'encouragement' | 'love';

export interface Affirmation {
  id: string;
  day: number;
  text: string;
  verse: string;
  verseRef: string;
  category: Category;
}

export interface Devotional {
  id: string;
  title: string;
  scripture: string;
  scriptureRef: string;
  reflection: string;
  prayer: string;
  dayIndex: number;
}

export const categoryInfo: Record<Category, { label: string; icon: string; iconSet: 'Ionicons' | 'MaterialCommunityIcons'; color: string; darkColor: string }> = {
  faith: { label: 'Faith', icon: 'shield-checkmark-outline', iconSet: 'Ionicons', color: '#2D5A3D', darkColor: '#5BA67A' },
  financial: { label: 'Financial Breakthrough', icon: 'cash-outline', iconSet: 'Ionicons', color: '#C8963E', darkColor: '#D4A853' },
  healing: { label: 'Healing', icon: 'heart-outline', iconSet: 'Ionicons', color: '#C44536', darkColor: '#E06050' },
  purpose: { label: 'Purpose', icon: 'compass-outline', iconSet: 'Ionicons', color: '#4A6FA5', darkColor: '#6B8FC5' },
  discipline: { label: 'Discipline', icon: 'fitness-outline', iconSet: 'Ionicons', color: '#7B5EA7', darkColor: '#9B7EC7' },
  leadership: { label: 'Leadership', icon: 'flag-outline', iconSet: 'Ionicons', color: '#1B2838', darkColor: '#A0B0C0' },
  hope: { label: 'Hope', icon: 'sunny-outline', iconSet: 'Ionicons', color: '#E8A317', darkColor: '#F0C060' },
  grace: { label: 'Grace', icon: 'flower-outline', iconSet: 'Ionicons', color: '#8B5E83', darkColor: '#B07EA8' },
  encouragement: { label: 'Encouragement', icon: 'megaphone-outline', iconSet: 'Ionicons', color: '#2E7D6F', darkColor: '#4CA896' },
  love: { label: 'Love', icon: 'heart-circle-outline', iconSet: 'Ionicons', color: '#C2185B', darkColor: '#E91E63' },
};

`;

// Write affirmations as a chunked data structure to keep the file manageable
const categoryChunks = {};
for (const aff of affirmations) {
  if (!categoryChunks[aff.category]) categoryChunks[aff.category] = [];
  categoryChunks[aff.category].push(aff);
}

output += `export const affirmations: Affirmation[] = [\n`;
for (const [cat, affs] of Object.entries(categoryChunks)) {
  for (const a of affs) {
    const text = a.text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const verse = a.verse.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const verseRef = a.verseRef.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    output += `  { id: '${a.id}', day: ${a.day}, text: '${text}', verse: '${verse}', verseRef: '${verseRef}', category: '${a.category}' },\n`;
  }
}
output += `];\n\n`;

// Keep devotionals
output += `export const devotionals: Devotional[] = [
  {
    id: 'dev1', dayIndex: 0,
    title: 'Walking in Confidence',
    scripture: 'The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.',
    scriptureRef: 'Deuteronomy 31:8',
    reflection: 'Today, remember that your confidence does not come from your own abilities, but from the God who goes before you. Every challenge you face has already been seen by the One who holds your future. When anxiety whispers that you are not enough, let God\\'s truth speak louder: He is with you, He will never leave you, and He has already made a way.',
    prayer: 'Lord, help me to walk in confidence today, knowing that You go before me. Remove every trace of fear and replace it with unshakable faith. Let me move forward boldly, trusting in Your plan. Amen.'
  },
  {
    id: 'dev2', dayIndex: 1,
    title: 'The Power of Stillness',
    scripture: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
    scriptureRef: 'Psalm 46:10',
    reflection: 'In a world that never stops moving, God calls us to be still. Stillness is not weakness—it is an act of radical trust. When you stop striving and simply rest in His presence, you acknowledge that He is sovereign over every situation. Today, take a moment to be still. Let go of the need to control, and simply be in His presence.',
    prayer: 'Father, teach me the discipline of stillness. In the busyness of life, help me find moments to pause and acknowledge Your sovereignty. Let my spirit be refreshed in Your presence today. Amen.'
  },
  {
    id: 'dev3', dayIndex: 2,
    title: 'Seeds of Generosity',
    scripture: 'Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.',
    scriptureRef: '2 Corinthians 9:6',
    reflection: 'Generosity is not just about money—it is about how freely you give your time, attention, love, and grace. When you give generously, you reflect the heart of God, who gave His only Son for us. Today, look for opportunities to sow generously into someone\\'s life.',
    prayer: 'Lord, make me generous in every way. Open my eyes to the needs around me and give me the courage to give freely. Let my life be a reflection of Your overwhelming generosity. Amen.'
  },
  {
    id: 'dev4', dayIndex: 3,
    title: 'Overcoming Through Prayer',
    scripture: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
    scriptureRef: 'Philippians 4:6',
    reflection: 'Prayer is not a last resort—it is the first response of a believer who trusts God. When worry tries to overtake you, redirect that energy into prayer. God invites you to bring everything to Him: your fears, your dreams, your confusion, and your gratitude.',
    prayer: 'Heavenly Father, I bring all my anxieties to You today. I choose prayer over worry, faith over fear. Thank You for always listening and for working all things for my good. Amen.'
  },
  {
    id: 'dev5', dayIndex: 4,
    title: 'The Strength in Weakness',
    scripture: 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness."',
    scriptureRef: '2 Corinthians 12:9',
    reflection: 'Our culture celebrates strength and self-sufficiency, but God works differently. He uses our weaknesses as doorways for His power. When you feel inadequate, remember that you are the perfect candidate for God\\'s grace.',
    prayer: 'Lord, I surrender my weaknesses to You today. I trust that Your grace is more than enough for every challenge I face. Use my imperfections to display Your perfect power. Amen.'
  },
  {
    id: 'dev6', dayIndex: 5,
    title: 'Renewing Your Mind',
    scripture: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
    scriptureRef: 'Romans 12:2',
    reflection: 'Transformation begins in the mind. The thoughts you feed grow stronger, and the thoughts you starve grow weaker. God\\'s Word is the ultimate mind-renewing agent. Today, choose to replace one negative thought pattern with a promise from God\\'s Word.',
    prayer: 'Father, renew my mind today. Help me to reject the patterns of this world and embrace Your truth. Transform my thinking so that my actions reflect Your character. Amen.'
  },
  {
    id: 'dev7', dayIndex: 6,
    title: 'A Heart of Gratitude',
    scripture: 'Give thanks in all circumstances; for this is God\\'s will for you in Christ Jesus.',
    scriptureRef: '1 Thessalonians 5:18',
    reflection: 'Gratitude is not about ignoring hardship—it is about choosing to see God\\'s faithfulness even in the midst of difficulty. A grateful heart shifts your perspective from what is lacking to what has been given.',
    prayer: 'Lord, I choose gratitude today. Thank You for every blessing, seen and unseen. Help me to cultivate a heart that overflows with thanksgiving in every season. Amen.'
  },
  {
    id: 'dev8', dayIndex: 7,
    title: 'Walking in Love',
    scripture: 'Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.',
    scriptureRef: '1 John 4:7',
    reflection: 'Love is not merely an emotion—it is a choice and an action. God\\'s love is sacrificial, unconditional, and transformative. When you choose to love others as God loves you, you become a living testimony of His grace.',
    prayer: 'God, fill my heart with Your love today. Help me to love others the way You love me—without conditions, without limits. Let my love be a reflection of Yours. Amen.'
  },
  {
    id: 'dev9', dayIndex: 8,
    title: 'God\\'s Unfailing Faithfulness',
    scripture: 'Know therefore that the Lord your God is God; he is the faithful God, keeping his covenant of love to a thousand generations.',
    scriptureRef: 'Deuteronomy 7:9',
    reflection: 'When everything around you seems uncertain, God\\'s faithfulness remains constant. He has never broken a promise, never failed to show up, and never abandoned His people.',
    prayer: 'Faithful God, I choose to trust You today even when I cannot see the full picture. Your track record is perfect, and I rest in the assurance that You will never fail me. Amen.'
  },
  {
    id: 'dev10', dayIndex: 9,
    title: 'The Joy of the Lord',
    scripture: 'Do not grieve, for the joy of the Lord is your strength.',
    scriptureRef: 'Nehemiah 8:10',
    reflection: 'True joy is not dependent on circumstances—it flows from a deep relationship with God. The joy of the Lord is not a fleeting happiness but a deep, abiding strength that sustains you through every trial.',
    prayer: 'Lord, fill me with Your joy today. Not a shallow happiness, but a deep, abiding joy that comes from knowing You. Let Your joy be my strength in every moment. Amen.'
  },
  {
    id: 'dev11', dayIndex: 10,
    title: 'Armor of God',
    scripture: 'Put on the full armor of God, so that you can take your stand against the devil\\'s schemes.',
    scriptureRef: 'Ephesians 6:11',
    reflection: 'Every day is a spiritual battle, but God has not left you defenseless. He has equipped you with truth, righteousness, peace, faith, salvation, and His Word.',
    prayer: 'Lord, I put on Your full armor today. Guard my mind with the helmet of salvation, protect my heart with the breastplate of righteousness, and arm me with the sword of Your Spirit. Amen.'
  },
  {
    id: 'dev12', dayIndex: 11,
    title: 'Divine Patience',
    scripture: 'But if we hope for what we do not yet have, we wait for it patiently.',
    scriptureRef: 'Romans 8:25',
    reflection: 'Waiting is one of the hardest disciplines of faith, yet it is where some of the deepest growth happens. God\\'s timing is never early and never late.',
    prayer: 'Father, give me patience to wait on Your perfect timing. Help me trust that every delay is part of Your divine plan. Strengthen my faith in the waiting season. Amen.'
  },
  {
    id: 'dev13', dayIndex: 12,
    title: 'Living with Purpose',
    scripture: 'For to me, to live is Christ and to die is gain.',
    scriptureRef: 'Philippians 1:21',
    reflection: 'When Christ becomes the center of your life, everything else falls into its proper place. Living with purpose means aligning your daily choices with God\\'s eternal plan.',
    prayer: 'Lord Jesus, be the center of everything I do today. Align my purpose with Yours, my will with Yours, and my desires with Yours. Let me live fully for You. Amen.'
  },
  {
    id: 'dev14', dayIndex: 13,
    title: 'Restored and Renewed',
    scripture: 'He restores my soul. He leads me in paths of righteousness for his name\\'s sake.',
    scriptureRef: 'Psalm 23:3',
    reflection: 'No matter how worn out, broken, or weary you feel, God is in the business of restoration. He takes broken pieces and creates beautiful mosaics.',
    prayer: 'Restorer of my soul, I bring every broken area of my life to You. Heal what is wounded, revive what is dormant, and renew what is weary. Make me whole again. Amen.'
  },
];

`;

output += `export function getDailyAffirmation(): Affirmation {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return affirmations[dayOfYear % affirmations.length];
}

export function getDailyDevotional(): Devotional {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return devotionals[dayOfYear % devotionals.length];
}

export function getAffirmationsByCategory(category: Category): Affirmation[] {
  return affirmations.filter(a => a.category === category);
}

export function getDailyAffirmationByCategory(category: Category): Affirmation {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const categoryAffirmations = getAffirmationsByCategory(category);
  return categoryAffirmations[dayOfYear % categoryAffirmations.length];
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'constants', 'affirmations.ts'), output, 'utf8');

const stats = {};
for (const [cat, affs] of Object.entries(categoryChunks)) {
  stats[cat] = affs.length;
}
console.log('Generated affirmations:', stats);
console.log('Total:', affirmations.length);
