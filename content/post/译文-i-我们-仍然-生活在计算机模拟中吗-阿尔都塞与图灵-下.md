---
title: "译文 I 我们（仍然）生活在计算机模拟中吗？阿尔都塞与图灵（下）"
date: 2025-01-01
type: "translation"
author: "随机轮编辑部"
tags: ["阿尔都塞", "斯宾诺莎", "相遇唯物主义", "意识形态理论", "认识论", "资本主义批判"]
cover: "/img/covers/译文-i-我们-仍然-生活在计算机模拟中吗-阿尔都塞与图灵-下.jpg"
wordcount: 46005
---

原标题：
Are We Still Living in a Computer Simulation?: Althusser and Turing

出处：

Diacritics, 第43卷, 第2期, 2015年, 第92-121页

## >> 判定问题 THE DECISION PROBLEM

多年来，我们已经习惯了阿尔都塞在哲学中的清算议程。大卫·希尔伯特（David   Hilbert）1900年8月在巴黎国际数学家大会上的讲话或许可以由一种更乌托邦的冲动来解释。正如阿尔都塞六十多年后所做的那样，希尔伯特试图想象一门当时并不存在的新学科的未来——即关于所有数学（数学的对象）的形式公理系统。在希尔伯特的巴黎演讲挑战听众解决的二十三个未解决的数学问题中——“揭开隐藏未来的面纱”[44]——而我们感兴趣的问题是其中的第十个问题，即所谓的判定问题或Entscheidungsproblem，图灵1936年的论文就是对此的回应。希尔伯特将第十个问题描述为“丢番图方程可解性的判定”：

给定一个具有任意数量未知量和有理整数数值系数的丢番图方程：设计一个过程，根据该过程，可以通过有限次运算确定该方程是否有有理整数解。[45]

请注意，希尔伯特指定了有限数量的“运算”。这一思想在图灵的方法中起了决定性作用。他的独创性不在于确定希尔伯特的问题是否能被解决。相反，正如他1936年论文的标题所暗示的，图灵着手做的是将希尔伯特的判定或确定问题重新表述为一个计算问题。这是一种对于阿尔都塞（或对于艾蒂安·巴利巴尔[Étienne   Balibar]）而言几乎不会被忽略的独创性，他在整个1960年代的核心哲学关注点涉及能够从“无限的具体决定性”中确定一种有限的生产方式——res   singulares（独特事物）的不变性。[46]阿尔都塞对该问题的独创性重新表述相当于将决定determination重新思考为“多元决定”overdetermination，也就是永远无法实现“终极的、孤独的时刻”的决定。[47]

我们从阿尔都塞与斯宾诺莎的短暂相遇（以及皮埃尔·马舍雷[Pierre   Macherey]持久的相遇）中，认识到了确定性与决定的“复杂性”。[48]基于有限和无限量级之间深刻的不可通约性，如何可能从无限的因果链中推断出一个“确定的存在”或有限的模态mode？[49]康托尔Cantor革命及随后的集合论公理化将致力于通过区分可数无穷和不可数无穷来为该问题提供其数学解决方案。在康托尔之后（且反斯宾诺莎），我们终于可以合法地谈论一个无穷——或一个无限总体或集合——以指定具有无限基数的可数数字集合。自然数、有理数和代数数都是可数总体或集合的例子，它们每个都可以数到无穷（可枚举的）。这些集合表示为ℵ₀ （阿列夫零），意指那些最小的无限基数。相比之下，康托尔没有发现对实数集R的可枚举性的证明，因此康托尔将其归入“不可枚举无穷”的范畴。[50]

我们可能会想，康托尔在未能找到这种证明时，是否无意中在某个“更高层面”的抽象上重新引入了黑格尔对“好无限”与“坏无限”的区分。让我们提醒自己，希尔伯特的判定问题要求证明任何以有理整数表达的数学陈述是可解的（注：有理整数集是实数集的子集）。我刚才提到的图灵对希尔伯特问题的独创性重新表述是什么？安德鲁·霍奇斯（Andrew   Hodges）写道：“图灵的特点在于，他不通过证明的方式，而是用计算指令的方式来重新提出希尔伯特的问题”。[51]换句话说，是否存在一个有限的、实在的指令程序，当实施时，允许计算任何数字？想象一个计算设备，一台机器，在纸带上打印  111111 ...  通过将这种行为建模为算法，我们就奇迹般地把一个实数定义为了无限循环小数。当然，如果人们期望机器在纸带上输出整个数字，那肯定会失望。要打印一个无限小数，机器需要无限的时间。然而，通过机器描述该计算该数字的过程的行为模式或者思维方式，我们可以生成与之对应的算法。

“描述”——按现代标准即计算机编程——是一组指令，描述特定机器在进行计算时的行为。由于图灵是数学家，他的目的是表明每台机器都可以由一个被唯一地被一个“描述数”（description   number）所描述。想想今天二进制记数法的广泛应用，以及它如何使我们将几乎任何我们拥有或想象的东西编码为一系列的0和1。这种普遍化的数字描述是图灵解决希尔伯特判定问题方法的一个有用类比。如果可能发明一台机器来执行一种复杂的行为，例如计算任何实数，然后对于每次计算，将机器的行为编码为一个有限的描述数，那么希尔伯特的问题就解决了。然而，与阿尔都塞对“上帝理智”的偏见相反——上帝的理智“运作起来有点像一台计算机”——“拥有上帝无限智慧的哲学家的过分狂妄会理解不仅真实世界，而且这个神圣组合的‘微积分’，以及因此事物的激进起源”（141-42）——图灵的《论可计算数》明确排除了这种神力。判定问题——确定是否存在解决丢番图方程的算法的问题——“无法解决”。[52]在万物的普遍图景中，尽管机器有能力做一些相当了不起的事情，比如计算π。

## >> 作为有限状态机的询唤 INTERPELLATION AS A FINITE STATE MACHINE

对阿尔都塞来说，非决定论是“规则”而非例外：“在‘任何’世界或任何国家中都不存在永恒的‘法则’”。[53]采用图灵的建构主义方法，我们能否通过计算来模拟这种非决定论的、“没有法则”的状态？让我们首先强调的是，图灵认为：“机器”（machine，即在输入上工作的计算设备或装置，不管是人类还是其他）与“状态”（state，即所谓的m-格局，控制机器的转换及其输出）之间存在重要区别。虽然可能存在无限数量的可以计算的机器，但它们的状态总是有限的。作为一种个体转化为特定主体的过程，可以把询唤Interpellation设想为这样的一种机器及与其行为。注意图灵所说的“状态”只是为正在被描述的行为提供了一个离散快照。[54]在政治的话语空间中，不存在比“把个体询唤为主体”保障国家机器的保证更多的来自“唯一的、绝对的、大写的主体，即上帝”的保证能够保证行为。[55]在任意的、给定的情况下，“国家”是一个无状态协议；机器及其行为必须被逐位计算。那些被询唤所代表和再生产的因此是对事物真实状态与运动中的事物的意识形态扭曲。以其认为是主权个体在虚空中开辟道路，不如说，男男女女是处于自由落体中的、缺乏一切可辨识模式的原子（“原子式的个人”）。利维坦不受任何契约约束。[56]因此，科学挑战是正确地以算法描述这种无法无天。

到目前为止，我一直在谈论图灵机TMs和有限状态机FSMs，仿佛它们是同义词。然而，二者有一个至关重要的区别。FSM受限于其读取输入并基于该输入在状态之间转换的能力，而TM具有额外的能力，即将其自身行为编码在无限纸带上，这是FSM做不到的。换句话说，TM是一台自指机器，其内存是可写的。另一方面，FSM不能“记住”或记录其自身的输出。

让我们用一个熟悉的例子。考虑一个FSM在接收到输入或表达“喂，你！”时的行为。在给定状态（“误认”[misrecognition]）接收到输入时，机器转换到一个新状态（“承认”[recognition]）并产生输出，表达“谁？我？”然后它转换回之前的状态（“误认”）。每个状态可以表示为二元选择——首先，在输入0或1之间，然后在输出0或1之间——1决定转换到下一个状态，0不转换（见图1）。

现在，让我们将这种FSM行为转换为一个描述数。然后对每一个可构想的、用FSM描述的询唤变体做同样的事情。值得警告的是，这里可能存在很多这样的机器。毕竟，询唤是一种模棱两可且具有潜在非确定性的语言，这就意味着在街上招呼某人往往可能有“随机”和不可预测的后果。尽管如此，给每个FSM分配一个描述数并按大小排序。由于图灵告诉我们，FSM的每个描述数都可以与一个自然数配对，因此所有询唤-FSM必然是可数的。[57]

但我们还没有完成。图灵解决判定问题的方法在其理论实践上是严谨的。图灵并不只是想知道所有行为都可以被定义并分配一个数字。图灵想知道的是，一旦这些行为被转换为数字，那么在其中：哪些行为是可计算的，即其中哪些实际上可以被模拟。其中一些最终可能无法通过图灵测试。考虑一台输入为“喂，你！”的机器。如果对于任何此类输入，有三种可能的选项会发生什么？机器会如何反应？例如，在接收到二进制输入1时，机器可以保持在“误认”状态；或者，转换到“承认”状态；或者，转换到“过度认同”overidentification状态（见图2）。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ibenSgjd8ooxlvNMBIMVs3P49281lzf1eiboQzp6H8hhf209ENEpC3aRTztjVJWicxNvleuFxwicbAMBANjiayp3gIg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1

图1

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ibenSgjd8ooxlvNMBIMVs3P49281lzf1emHFH55ve2QDEicZq2069YuvWysibeQqJtoGwM9z2iavfqCyUKBLlu5eKg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1imgIndex=1)

图2

我在别处曾提出，确定的否定（determinate   negation）是阿尔都塞政治哲学中限定性概念。[58]这里我们有了它的图灵等价物：非确定性有限状态机。毛泽东1966年“十六条”的第四点提供了这种模糊性和此类询唤的通用例子：“自己教育自己，去识别那些是对的，那些是错的，那些作法是正确的，那些作法是不正确的”。[59]从革命历史的记录中可以引用大量类似灵感的例子。

但是回到我们的例子：面对这种模糊性，FSM会如何反应？撇开每个非确定性FSMNFSM都可以（通过子集构造）转换为确定性FSM这一相当技术性的事实不谈，[60]答案并不十分清楚。面对同一输入有多种路径选择的FSM可能会循环或默认回到其起始状态（或者在TM的情况下，回到磁带的开头）。在极端情况下，它可能会崩溃——就像畅销书作家描述的文革中社会崩溃那样。[61]图灵将他的机器分为令人满意的或“无环”circle-free机器和不令人满意的或“有环”circular机器。“如果一台机器到达一个没有可能移动的格局，它就是有环的”，图灵解释说。[62]因此，有些机器虽然已被描述，但仍然无法计算它们的数字序列。相比之下：“如果一个序列可以由无环机器计算，则称该序列是可计算的。如果一个数字与无环机器计算的数字相差一个整数，则该数字是可计算的”。[63]无环机器完成它们的任务：它们保持运行。有环机器则不然：它们卡住、走错路、停机。毛泽东的“决定”可以说成是对实践的终极考验。由此可见，描述是“创制”Poiesis，对“实践”本身的生产机制；而在第二步的“计算”则是其“实践”Praxis，是坚持到底、完成过程任务所需的自我评估与严明纪律。是否可能构建一台元机器或超机器，能够为每个描述数确定哪些是无环的（因此是可计算的行为），哪些是有环的和不可计算的？

## >> 深思 DEEP THOUGHT

让我们暂停一下。这里提出的主张引来了怀疑。毕竟，“万物皆数”的想法让“对应”这个概念进入一些疑问之中去。当我们声称一种行为可以被某台机器描述，并分配一个描述数时，我们实际上在生产着什么样的形而上学主张呢？是否有一个描述数，一个机器代码，对应于俄国革命的事件序列？巴黎公社？五月风暴？这些序列是“可计算的”吗？这个想法容易招致嘲笑，尽管是以一种递归的喜剧姿态。回想一下《银河系漫游指南》（The Hitchhiker’s Guide to the Galaxy），超级计算机“深思”（Deep   Thought）使用了七千五百万年的时间来计算“生命、宇宙及一切的终极问题”的答案——最终决定答案是“42”。在向两个困惑的泛维度生物（其远祖最初提出了这个问题）解释七百五十万年计算得出的毁灭性结果时，深思解释说答案之所以难以理解，是因为“你从来就没有真正知道问题是什么”。[64]

但是，另一方面，人们期望什么样的经验或“物质”对应呢？显然，将“对应”视为直接在日常现实的抽象领域中获得是愚蠢的：个人与国家之间的对应，或者自然状态的“透明性”（其否定建立了它自己的神话，144）。对于阿兰·巴迪欧（Alain   Badiou）来说，一个普通社会情境的“元素”，尽管既被呈现又被再现，却永远无法被国家充分地计数为一。有充分的理由假设，鉴于实数的总体既不能被计数（康托尔）也不能被计算（图灵），个人与其生存的“真实”条件的关系远远超出了所有可描述的参数。如果这种关系远远超出了所有可描述的参数，那么必然得出结论：我们缺乏所有用于此类描述的因果标准，例如“一般意识形态”如何能将个人“转化”为主体（这里“原因”被理解为不同于决定的东西）。用阿尔都塞的话来说：“或者更确切地说，要撇开因果语言，就必须提出这样的论点：正是这种关系[人们真实生存条件]的想象性质构成了我们在所有意识形态中观察到的所有想象扭曲（如果我们不生活在其真理中）的基础”。[65]“撇开”（去总体化）因果语言就是邀请将意识形态理论化为一种函数。后者与“功能主义”无关。通俗地说，在逻辑和数学中，函数是一个其定义包含在自身自变量中的值。在FSM的情况下，函数是机器的输出，不用说也知道，它将由输入控制。在TM的情况下，输入产生纸带上输出，函数是TM停机后纸带上打印的数字。在每种情况下，函数都在其自身论证之内，或者简单地说，由机器的行为定义。如果我们将这一看法延伸到阿尔都塞关于意识形态的说法，我们可以直观地看到他的论点是递归的：真实关系的想象性质是“构成”所有可观察到的对现实关系的想象性表述的基础。意识形态不仅扭曲真实，还是对扭曲真实的（想象的）扭曲的扭曲。以此类推，无穷无尽。

在任何特定情况下，构成意识形态基础的不是“上帝、责任、正义”[66]——甚至不是国家——而只是其自身再生产的理由——算法。但这种递归是可计算的吗？德克斯特·C·柯岑（Dexter  C. Kozen）将“递归”定义为那些存在全函数或其输入可以被“全图灵机”（total Turing  machine）接受的集合。然而，对于每一个这样的输入，全图灵机被保证会停机，而不是进行无限计算。[67]当然，在计算机科学中，就像在意识形态中一样，困难在于准确预测何时。

## >>询唤：德勒克吕兹 (INTERPELLATION: DELESCLUZE)

以完美的精确度决定各种任意行为的满意度是最稳健的革命“传统”的特征。革命通常被理解为偶然性问题，即超越客观知识和主观预期。让我们回到作为一种“革命”而非平庸行为的询唤，探索其描述的界限。不熟悉以下历史例子的读者请参考我的参考文献。

巴黎，1871年5月22日。《巴黎公社公报》（Le journal officiel de la Commune de Paris）发表了战争委员会文职代表查尔斯·德勒克吕兹Charles Delescluze的最后宣言《致巴黎人民——致国民自卫军》，其结尾写道：

公民们，如果有必要，你们的代表将与你们一起战斗并牺牲。但是，以上帝的名义，为了这光荣的法兰西——所有人民革命的母亲，正义与团结思想的永久家园（这些思想是并将是人类的法则）——向敌人进军吧，让你们的革命能量向他表明，尽管他背叛了巴黎，我们永远不会放弃它或被击败。

公社指望你们，指望公社！[68]

这在公社最后插曲中最具争议性的事件中占据了重要的位置，在这些插曲中，德勒克吕兹被指控在恐慌和绝望的意外时刻牺牲了军事纪律。[69]然而，撇开历史争议不谈，正如我们之前的例子一样，我们能否想出一个算法来模拟这种询唤？此外，一旦设计并转换为描述数，它是否代表了一种令人满意的行为？换句话说，在计算方面，这种行为是无环的吗？回想一下，无环机器是其任务（或程序）可计算的机器，因此以完美的精确度执行。换句话说，可以生成无限小数扩展的程序。这在简化形式上就是判定问题：程序能否在不停机的情况下顺利解决给定输入的每一个难题——每一个是/否转换？请注意，关于某种行为是否无环的决定决不取决于某些外部、独立或本质主义的标准，例如该行为是否真的“是”它所声称的那样（“雅各宾式的”或“革命的”），因为这种行为从来不是直觉问题。问题不在于实践判断，而是在于话语的可理解性，也就是该行为的描述是否使得计算成为可能？

对于德勒克吕兹的询唤，让我们试着设想一台具有有限状态集Q；输入字母表Σ；转换函数δ；接受状态 t；和拒绝状态r的图灵机，对于所有输入：![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibenSgjd8ooxlvNMBIMVs3P49281lzf1ebDp6lR4Osg6UnOO4l7vfTsBbqYxa4CbuHymeJ1SE3gD14P4QKKyChA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1

并且：t ∈ Q且 r ∈ Q

请注意，这个初步草图远非图灵机的正式定义，图灵机也可以采取多种形式，包括4元组、5元组（如上）、7元组和9元组。“元组”是指构成机器组件的有限集合列表。在我们的例子中，机器有五元组，(Q,Σ,r,q,δ)，尽管在这种情况下，我省略了用于在纸带上书写符号的集合（严格来说这使它成为FSM而不是TM）。转换函数39;宋体&39;; mso-bidi-font-family: 宋体; color: windowtext; font-weight: normal; mso-bidi-font-weight: normal;"},"namespaceURI":"http://www.w3.org/1999/xhtml"},"node",{"tagName":"span","attributes":{"style":"mso-bookmark:u64e566a0"},"namespaceURI":"http://www.w3.org/1999/xhtml"},"node",{"tagName":"span","attributes":{"style":"font-family:Noto Serif SC;\nmso-ascii-font-family:Noto Serif SC;\nfont-variant:normal;\ntext-transform:none"},"namespaceURI":"http://www.w3.org/1999/xhtml"}]">δ通常由状态表（此处未显示）指定，这是描述机器行为的程序。让我们开始勾勒这个程序。例如，在起始状态q0，让机器接受包含符号a, b或c的任何输入或数据串并转换到状态 。这意味着对于字符串 a, abb, abccca 或 cc，机器正在转换到q1。而对于任何包含符号 d 的字符串，机器拒绝它并停留在q1这意味着对于字符串 d, bdbdd, cda 或 ccccd，机器停留在q0。以此类推，对于任何包含 d 的输入，我们有r ∈ Q → q0，对于所有其他输入，我们有r ∈ Q → q1。对于从q1到q2的转换，可以修改语法，不是完全拒绝 d 输入，而是可以接受以 d 开头的字符串并拒绝以 d 结尾的字符串。

这是一个故意过度简化的机器计划，需要增强；至少如果我们要以完美的精确度描述它的行为。德勒克吕兹机器暗示了一种丰富表达的行为库，却仅包含a,b,c和d四个符号的字母表。我们可以想象稍微扩展它一下。此外，关键的是，我们需要添加一组（公理）管理读/写指令，用于在半无限纸带上打印机器的输出（没有这个，它的计算将保持抽象而不是具体知识，即不会记录在数字或字母符号中）。[70]除了我们已有的三个状态外，我们还可以添加一些补充转换状态，同时确保尽量减少冗余状态。[71]香农（C.  E.  Shannon）著名的“信息冗余”，[72]计算理论旨在通过数据压缩来消除。根据蔡廷Chaitin的说法，压缩是在形式公理系统中理解的代价，其中定理的数量大大超过公理。[73]这样的系统提供了在不丢失信息的情况下进行表示的最小句法框架。在我们的例子中，让我们推测压缩程度（即在不丢失信息的情况下可能丢失的数据量），可能大致相当于以下两者之间的质性的或经验的差异：作为公社模拟器的1980年代街机游戏或在城市尺度上的对其历史形势的模拟。尽管马克思在《雾月十八日》中的评论具有历史特殊性，既哀叹又讽刺革命倾向于作为古装剧上演，正如1848年至1851年间在法国发生的那样——当时“只有旧革命的幽灵在游荡”[74]——并且假设他对公社的赞赏已被阅读，我认为计算机模拟在精确计算一种行为的意义上，潜在地是“革命性的”。我不久将回到这一点。

顺便提一下，5元组中的每一组都是一个公理，共同构成了作为自包含形式公理系统的机器语言。在计算理论中，此类系统具有巨大的处理能力，每种语言理论上都对无限扩展和重新配置开放。巴迪欧采用集合论的八个公理（ZFC公理）来代表本体论的历史（真理），[75]而在计算理论中，一种独特的行为可以包括，例如，包含十亿个状态的公理，具有任何大小的字母表，只要状态和字母表是有限的。

这数据编程模型难道不让人想起电脑游戏吗？难道我们只是在玩“流血周回归”（The  Bloody Week  Returns）吗？图灵的论文几乎没有提到选择机器或“c-机器”，只是指出它们依赖于“外部操作员”。相比之下，自动机器或“a-机器”是“完全由其配置决定的”。[76]图灵机被设想为一种自指和自立的行为，其程序是它所需的所有信息。也没有神力（外部的）用操纵杆操纵或控制游戏。它的通用性——即在图灵之后，我们要假设一台TM可以模拟任何其他机器的行为[77]——也不受限于特定的软件或硬件应用。自立意味着自主。这就是图灵所说的自动或a-机器的意思。而且，如果它是自主的，我们是否可以说机器行为就是任何观察者可能有理由称之为随机的那种行为？如果这是可计算的，我们在多大程度上可以将给定的行为称为随机的呢？

这触及了判定问题的核心。随机性是无法从中预测任何移动的“无规则”状态。在直觉上，可以说德勒克吕兹对法国公民的询唤属于这一类问题，虽然在当时这是一场政治上的组织灾难。而在此要注意是，不能被其表面上的模糊性所迷惑。   [78]模糊性不并是随机性。那些被算作模糊性的东西，可能仅仅只是一种表面性的感知的后果，我们可能会解决它或使其确定化、收编它，或将其从非确定性FSM转换为确定性FSM。相反，我的目标是将这种超出所有知识和预测能力的完美的计算精确度描述为随机的，并因此在某种意义上是“革命性的”。让我们假设任何适合这种计算的随机行为都可以生成一个超越数（transcendental  number）。[79]  尽管大多数实数都是超越数，只有包括π、欧拉数e和蔡廷常数Ω在内的十几个超越数被严格证明过其超越性。这难道不是德勒克吕兹的“询唤”可能将我们带去的方向吗？一段处于未知和不可知领域的历史。一段可能不会发生的历史、或者实际上是一段从未发生过的历史。

## >> 随机性，不可压缩性：蔡廷 (RANDOMNESS, INCOMPRESSIBILITY: CHAITIN)

我们的消费生活方式需要计算机程序来模拟诸如洗碗、录制电视节目、完成纳税申报单和喂猫等世俗行为——更不用说那些全天候用“电子”信息询唤我们的程序了。这些行为是可编程的，或可计算的，因为他们是依赖于机器行为规范运作的。但是撇开世俗和意识形态不谈，一种革命行为呢，一种在我们的德勒克吕兹机器规模上独特的，并且假设可以像超越数那样精确确定的行为呢？可以构建这种前所未有且不可预测的机器吗？我们能预测不可预测的事物吗？

回想一下，希尔伯特的判定问题涉及决定对于任何给定的数字，它是否是丢番图方程的解。让我们想象一台丢番图方程计算机——一种“深思”——遵循公式：![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibenSgjd8ooxlvNMBIMVs3P49281lzf1e7ak8cM8WibtGppytTo4HNxoYB6ThibO9zC56icicmviahVFn0ItzBkgibS7A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1imgIndex=3)

其中 k 是计算机程序，n 是未知输出。对于 k，输入一个程序——例如，一个生成形式语言所有定理的算法——其中 x, y, z, …是输出n的时间变量。现在，如果计算机能够为任何输入生成解，蔡廷解释说，那么我们面前将有一台机器，它不仅能够决定我们输入的程序是否提供了丢番图方程的解。我们还将拥有一台能够“决定”它（机器）在进行计算过程中是否会停机的机器。[80]多少有些直观的是，撇开所谓的图灵停机问题（halting   problem）的形式证明不谈，[81]能够为任何输入生成是/否答案的机器是一台其“智力”无法被决定的机器，或者正如蔡廷的工作所表明的，是一台随机智力的机器。[82]

康托尔证明了由所有实数组成的集合是不可数的。图灵采用康托尔的对角线法证明了由所有实数组成的集合是不可计算的。[83]巴迪欧作为柏拉图主义者和哲学家解释说，“我们定性为‘实数’的是特定的、已经存在的数字”。此外：

对我们来说，一个实数将是那个最小物质的唯一数字，恰好位于两组二进有理数之间，这两组数可以显示为它的低集和高集，因此是子数字集……我们使用的二进有理数集是由实数子数字组成的。[84]

但是这里是否潜伏着自满？“如果我不能计算它，如果我不能证明它的位是什么，如果我甚至不能引用它，为什么我要相信一个实数？而这些事情发生的概率都是一！”蔡廷质问道。[85]在他的“对真实的激情”中，巴迪欧是否低估了从0到1的“再一步”的距离，就像那些误判站台与已经开动的火车之间空隙的人一样？随机选择一个0和1之间均匀分布的数字。蔡廷告诉我们，如果大多数实数（作为程序）是不可计算的，那么被选中的、作为输入程序的数字是可计算的概率是无限小的。鉴于图灵的开创性发现，即实数不是“已经存在的”，而是仅包含那些可以逐位计算的数字，那么我们有充分的理由怀疑它们的存在。[86]

一种相关的误解可以说影响了那些试图揭示“真实运动”却反常地坚持象征秩序连续性的拉康派话语（“象征维度是唯一能治愈的维度”）。[87]我们能否将精神分析机构、政治组织或政党构想为一台主体生成机器，一台输入原始数据（病人、个人）并输出主体（分析师、激进分子）的机器？试图从主体被排除在语言能指链之外这一事实推断出主体，并——通过类推——使零成为指定主体为数字序列函数的“匮乏”lack，这里充满了隐喻和转喻。[88]但值得称赞的是，阿尔都塞主义者巴迪欧坚持认为，这种能指链与数字序列的类比配对是谬误的。科学是“无主体的精神病，因此是所有的精神病”，一种“共享的谵妄”，“没有盲点的外部”。没有科学的主体。此外，“精神分析对科学无话可说，即使它可以教给我们很多关于服务于科学的科学家的事”。[89]

像巴迪欧一样，蔡廷肯定会承认将主体构想为数字序列的缝合或“缝合线”suture是愚蠢的。在蔡廷看来，存在一台主体生成机器的前景似乎是不可能的，因为任何有限集（随机）实数的比特数“不能被压缩到一个比特数相比其更小的FAS   [形式公理系统]中。”[90]事实上，蔡廷的数学事业中起作用的是被他称之为“不可压缩性”incompressibility极端的去缝合de-suturing。[91]压缩是一种努力导向形式语言中的“优雅”表述的努力。证明因其简洁而优雅。压缩使理解成为可能。但压缩也规定形式语言或公理系统FAS最终将是不完备的。换句话说，正如图灵机一样，FAS总是受限于其自身的公理。这符合一般的可计算性或数据处理原则，即无论大小如何，计算机都是一个封闭系统，并且在“外部”总是有比任何计算机在有限时间内实际能够处理的更多的数据。

## >> 其他宇宙 OTHER UNIVERSES

FAS数据压缩的概念大致与爱德华·弗雷德金（Edward  Fredkin）、赛斯·劳埃德Seth Lloyd、史蒂芬·沃尔夫勒姆（Stephen  Wolfram）等人的所谓数字哲学和数字物理学有着共同的假设，其中宇宙的“封闭系统”被假定为“任何计算机”、二进制数据与可被计算的物理过程。[92]看来莱布尼茨的一元论形而上学不会消失。声称数字哲学是一场统一的智力运动（相对于科学哲学中的一般取向）有些夸张。然而，必须谨慎看待这种假设。图灵从未肯定过这种字面意义上的对通用计算机的通用性的理解。另一方面，这里“字面上”是什么意思？我们是说图灵的思想实验必须按他预期的方式“抽象”地阅读吗？康托尔革命深刻破坏的当然是这样一种观念，即“抽象与具体对立，就像被分离的部分与整体 [tout]对立一样”。阿尔都塞同意：

因为如果你移除（抽象）真实的一部分，那部分也是真实的。你在什么意义上可以称之为“抽象”，不是在消极意义上，而是在积极意义上？如果被抽象的部分是由与其被抽象出的具体整体相同的“物质”构成的，那么抽象还剩下什么？(106)

如果我们扩展这种康托尔式的推理以包含对物理现实的思考，那么我们难道不是在鼓励一种在其预测能力和结果方面都减弱的科学概念吗——无论是历史还是自然科学？难道不是为了支持一种“共享谵妄”的科学，一种“没有盲点的外部”（巴迪欧）；一种无主体的过程（阿尔都塞）；或算法不可压缩性（蔡廷）的科学，而放弃客观和理性知识的观念，放弃封闭和可控系统的观念吗？此外，通过认可数字物理学关于“宇宙是一台计算机”的主张，我们难道不是完全质疑了被模拟的现实的领域与正在模拟的机器之间的区别吗？

波斯特洛姆Bostrom将通用计算扩展到了这样一个不可思议的方向，尽管这是笛卡尔遗留给我们并在科幻小说中普及的，他使用概率论假设，只要人类生存（已经生存？）足够长的时间以达到“技术成熟期”，那么他们几乎肯定会生活在一个计算机模拟中——尽管正如任何判定问题一样，没有可能从模拟内部决定性地判定我们当前是否居住在模拟中。如果我们生活在计算机模拟中，那么我们观察到的宇宙可能是一个完全“其他”宇宙的有缺陷和不具代表性的样本。[93]阿尔都塞通过在依然是他最迷人和最具挑衅性的文本中声明来支持判定问题：

必须在意识形态之外，即在科学知识中，才能说：我在意识形态中（极其特殊的情况）或（一般情况）：我曾在意识形态中。众所周知，身在意识形态中的指控只适用于他人，从不适用于自己（除非一个人真的是斯宾诺莎主义者或马克思主义者，在这件事上，这完全是一回事）。这等于说意识形态没有外部（对它自己而言），但同时它除了外部什么都不是（对科学和现实而言）。[94]

用阿尔都塞的话来说，“极其特殊的情况”（斯宾诺莎的第三种知识）带来了一个从意识形态中革命性的出口。但是用蔡廷的话来说，这种知识的仅仅直觉维度将被彻底超越，而重要的是，随机性本身——“除了外部什么都不是”——是可以被定义的。[95]蔡廷对随机性（作为不可计算性）的形式化使得阿尔都塞对莱布尼茨上帝的充足理由律的解释——一种旨在将确定性与他自己对偶然性的偏好进行对比的解释——变得完全多余。

## >> 结论 CONCLUSION

在政治上，偶然性让人想起周恩来在被问及对法国大革命的看法时那句神秘的回答：“现在下结论为时过早”。[96]这种保守主义似乎是阿尔都塞政治的合适墓志铭。话又说回来，这种政治“保守主义”绝不能被轻易打发。因为基于设计物理现实的数字模型，计算理论邀请我们得出与新自由主义体系所谓的不可动摇性恰恰相反的结论。换句话说，“该体系”远非不可动摇，而是必须在每一刻和通过每一个状态被再生产，尽管事实上在每一刻和通过每一个状态，整个大厦——计算——都可能崩溃、循环、完全停机。这个假设，尽管看起来很有说服力，实际上并非如此。这触及了蔡廷关于不可压缩性和随机性工作的核心。其在思考真实政治插曲中的可能应用将需要进一步和更彻底的调查。

虽然我们可以有把握地假设阿尔都塞对图灵的工作没有兴趣，但对于阿尔都塞关于偶然相遇唯物主义和原子论的遗作而言，后者的意义是无可争辩的。换句话说，在此条件上，我们可以将阿尔都塞在《入门》中讨论了三章的“抽象”问题，视为模拟问题。“上帝的理智，运作起来有点像计算机”的无限力量是阿尔都塞哲学想象的虚构：一部配得上伏尔泰本人的讽刺作品。与其完全相反，被阿尔都塞误认为是神圣理智的抽象延伸的计算机是一台基于实践的、概念上富有创造性的、但最终易错的机器：上帝不是以理想计算机的完美来运作，而是以蔡廷的Ω常数的无模式结构和逻辑不可约性来运作。[97]这就是图灵计算理论帮助引入的认识论断裂和思维革命。

## 引用和注释

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">44.Hilbert, “Mathematical Problems,” 437.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">45.Ibid., 458.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">46.Althusser, For Marx, 102.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">47.Ibid., 113.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">48.See Macherey, Hegel or Spinoza?

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">49.Ibid., 152.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">50.Several  non-specialist titles dealing with Georg Cantor and the history of set  theory have emerged over the last ten years. See e.g., David Foster  Wallace’s Everything and More.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">51.Hodges, Turing, 26.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">52.Turing, “On Computable Numbers,” 148.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">53.Althusser, Philosophy of the Encounter, 174.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">54.Turing, “On Computable Numbers,” 139–40.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">55.Althusser, “Ideology and Ideological State Apparatuses,” 52.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">56.Althusser, Philosophy of the Encounter, 181–82.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">57.“To  each computable sequence there corresponds at least one description  number, while to no description number does there correspond more than  one computable sequence. The computable sequences and numbers are  therefore enumerable” (Turing, “On Computable Numbers,” 127).

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">58.See Barker, “Missed Encounter: AlthusserMao—Spinoza.”

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">59.Central  Committee of the Chinese Communist Party, “Decision of the Central  Committee of the Chinese Communist Party Concerning the Great  Proletarian Cultural Revolution,” 8; translation modified.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">60.Kozen, Automata and Computability, 35.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">61.See Chang and Halliday, Mao: The Unknown Story.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">62.Turing, “On Computable Numbers,” 119.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">63.Ibid.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">64.Adams, The Hitchhiker’s Guide to the Galaxy, 152.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">65.Althusser, “Ideology and Ideological State Apparatuses,” 38.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">66.Ibid., 36.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">67.Kozen, Automata and Computability, 216–19.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">68.Livet, Le journal officiel de Paris pendant la Commune, 283–84; my translation.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">69.See e.g., Dominique, La commune de Paris; Talès, La commune de 1871.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">70.In other words a tape with a beginning but no end, where a machine could read input and continue printing output forever.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">71.Admittedly there are a great many Tayloristic applications that Turing never anticipated for his machine.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">72.Shannon, “A Mathematical Theory of Communication,” 24.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">73.Chaitin, Meta Math!, 102.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">74.Marx, The Eighteenth Brumaire of Louis Bonaparte, 17; translation modified.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">75.Badiou, Being and Event, 38–48.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">76.Turing, “On Computable Numbers,” 118.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">77.Ibid. 127: “It is possible to invent a single machine which can be used to compute any computable sequence.”

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">78.Doubly  beware: we are very far from having formalized Delescluze’s  interpellation as “random.” These are extremely impressionistic  speculations at best.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">79.Real  numbers comprise algebraic and transcendental numbers. In the first  case, whereas algebraic numbers are all roots of a non-zero polynomial  with integer coefficients (such as sqare root of 8 being the root of 39;mord&39;;font-family: Noto Sans SC;mso-ascii-font-family: Noto Sans SC;mso-fareast-font-family: Noto Sans SC;font-variant: normal;text-transform: none;">x239;mbin&39;;font-family: Noto Sans SC;mso-ascii-font-family: Noto Sans SC;mso-fareast-font-family: Noto Sans SC;font-variant: normal;text-transform: none;">−39;mord&39;;font-family: Noto Sans SC;mso-ascii-font-family: Noto Sans SC;mso-fareast-font-family: Noto Sans SC;font-variant: normal;text-transform: none;">839;mrel&39;;font-family: Noto Sans SC;mso-ascii-font-family: Noto Sans SC;mso-fareast-font-family: Noto Sans SC;font-variant: normal;text-transform: none;">=39;mord&39;;font-family: Noto Sans SC;mso-ascii-font-family: Noto Sans SC;mso-fareast-font-family: Noto Sans SC;font-variant: normal;text-transform: none;">0), in the second, transcendental numbers (such as 39;mord&39;;font-family: Noto Sans SC;mso-ascii-font-family: Noto Sans SC;mso-fareast-font-family: Noto Sans SC;font-variant: normal;text-transform: none;">π) resist such expression. See Wallace, Everything and More, 103n. Chaitin, Meta Math!, 33–34.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">80.The  halting problem is summarized as follows. Let U be a machine that can  simulate any TM Turing Machine behavior on a string of data so that U  halts and accepts x if the TM does; halts and rejects x if the TM does;  or, loops on x if the TM does. Is there a way for U to decide in  advance, or in other words without running what is essentially a  simulation, whether and how the TM will halt for data x? No, not without  actually running the simulation. Although, “there are certainly  machines for which it is possible to determine halting by some heuristic  or other: machines for which the start state is the accept state, for  example” (Kozen, Automata and Computability, 232; see also 231–34).

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">81.“This  proves that uncomputability and incompleteness [and “randomness” for  Chaitin—J. B.]are lurking right at the core, in two thousand-year old  Diophantine problems!” (Chaitin, Meta Math!, 34).

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">82.Turing, “On Computable Numbers, 132–34.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">83.Badiou, Number and Numbers, 176–77.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">84.Chaitin, Meta Math!, 99–100.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">85.See Chaitin, “How Real Are Real Numbers?”

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">86.Bruno Bosteels discusses Žižek’s  psychoanalytic obsession with symbolic order as well as his more recent  attempts to think “order out of disorder,” in The Actuality of  Communism, 170–224.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">87.Jacques-Alain  Miller’s celebrated paper from Cahiers pour l’Analyse would make such  an analogy by arguing that “the function of the subject, misrecognized”  is “operative” in this progression (Miller, “Suture,” 94).

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">88.Badiou, “Mark and Lack,” 172.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">89.Chaitin, Meta Math!, 97.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">90.Ibid., 115.

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">91.See Fredkin, “Finite Nature”; Wolfram, A New Kind of Science; Lloyd, Programming the Universe.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">92.See Bostrom, “Are We Living in a Computer Simulation?”

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">93.Althusser, “Ideology and Ideological State Apparatuses,” 49.

39;引用和注释&39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">94.According to Chaitin, “reals are transcendental/ uncomputable/random with probability one” (Chaitin, Meta Math!, 83).

39;;mso-style-parent: &39;列出段落&39;;mso-list: l0 level1 lfo1;margin-top: 6.0pt;margin-bottom: 6.0pt;text-align: justify;text-justify: inter-ideograph;margin-left: 18.0pt;text-indent: 0.0pt;mso-char-indent-count: 0;mso-char-indent-size: 0pt;line-height: normal;mso-pagination: widow-orphan;font-size: 9.0pt;mso-bidi-font-size: 11.0pt;font-family: Noto Sans SC;mso-fareast-font-family: &39;Noto Sans SC&39;;mso-bidi-font-family: Noto Sans SC;color: 000000;font-weight: normal;mso-bidi-font-weight: normal;">95.Zhou  was in fact reportedly offering his opinion on May ’68 to Henry  Kissinger or Richard Nixon during one of their visits to China in the  early 1970s. See McGregor, “Zhou’s Cryptic Caution Lost in Translation.”
