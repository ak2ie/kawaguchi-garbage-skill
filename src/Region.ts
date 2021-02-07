/**
 * 地域
 */
export enum Region {
  /**
 *  青木１～５丁目
 */
  Aoki1to5 = "Aoki1to5",

  /**
   *  赤井
   */
  Akai = "Akai",

  /**
   *  赤井１～４丁目
   */
  Akai1to4 = "Akai1to4",

  /**
   *  赤芝新田
   */
  AkashibaShinden = "AkashibaShinden",

  /**
   *  赤山
   */
  Akayama = "Akayama",

  /**
   *  朝日１～６丁目
   */
  Asahi1to6 = "Asahi1to6",

  /**
   *  新井宿
   */
  Araijuku = "Araijuku",

  /**
   *  新井町
   */
  AraiCho = "AraiCho",

  /**
   *  安行
   */
  Angyo = "Angyo",

  /**
   *  安行北谷
   */
  AngyoKitaya = "AngyoKitaya",

  /**
   *  安行吉蔵
   */
  AngyoKichizo = "AngyoKichizo",

  /**
   *  安行小山
   */
  AngyoKoyama = "AngyoKoyama",

  /**
   *  安行慈林
   */
  AngyoJirin = "AngyoJirin",

  /**
   *  安行出羽１～５丁目
   */
  AngyoDewa1to5 = "AngyoDewa1to5",

  /**
   *  安行藤八
   */
  AngyoTohachi = "AngyoTohachi",

  /**
   *  安行西立野
   */
  AngyoNishitateno = "AngyoNishitateno",

  /**
   *  安行原
   */
  AngyoHara = "AngyoHara",

  /**
   *  安行吉岡
   */
  AngyoYoshioka = "AngyoYoshioka",

  /**
   *  安行領家
   */
  AngyoRyoke = "AngyoRyoke",

  /**
   *  安行領在家
   */
  AngyoryoZaike = "AngyoryoZaike",

  /**
   *  安行領根岸(根岸第１町会）
   */
  AngyoryoNegishiNegishiDaiichiChokai = "AngyoryoNegishiNegishiDaiichiChokai",

  /**
   *  安行領根岸(根岸第１町会を除く）
   */
  AngyoryoNegishiOtherZone = "AngyoryoNegishiOtherZone",

  /**
   *  飯塚１～４丁目
   */
  Iizuka1to4 = "Iizuka1to4",

  /**
   *  飯原町
   */
  IiharaCho = "IiharaCho",

  /**
   *  伊刈（小谷場町会）
   */
  IkariKoyabaChokai = "IkariKoyabaChokai",

  /**
   *  伊刈（小谷場町会を除く）
   */
  IkariOtherZone = "IkariOtherZone",

  /**
   *  石神
   */
  Ishigami = "Ishigami",

  /**
   *  江戸１～３丁目
   */
  Edo1to3 = "Edo1to3",

  /**
   *  江戸袋１・２丁目
   */
  Edobukuro1to2 = "Edobukuro1to2",

  /**
   *  大竹
   */
  Otake = "Otake",

  /**
   *  金山町
   */
  KanayamaCho = "KanayamaCho",

  /**
   *  上青木１～６丁目
   */
  KamiAoki1to6 = "KamiAoki1to6",

  /**
   *  上青木西１～５丁目
   */
  KamiAokiNishi1to5 = "KamiAokiNishi1to5",

  /**
   *  川口１丁目
   */
  Kawaguchi1 = "Kawaguchi1",

  /**
   *  川口２～４丁目
   */
  Kawaguchi2to4 = "Kawaguchi2to4",

  /**
   *  川口５・６丁目
   */
  Kawaguchi5to6 = "Kawaguchi5to6",

  /**
   *  木曽呂（藤堤下）
   */
  KizoroFujitsutsumishita = "KizoroFujitsutsumishita",

  /**
   *  木曽呂（藤堤下を除く）
   */
  KizoroOtherZone = "KizoroOtherZone",

  /**
   *  北園町
   */
  KitazonoCho = "KitazonoCho",

  /**
   *  北原台１～３丁目
   */
  Kitaharadai1to3 = "Kitaharadai1to3",

  /**
   *  久左衛門新田
   */
  KyuzaemonShinden = "KyuzaemonShinden",

  /**
   *  行衛
   */
  Gyoe = "Gyoe",

  /**
   *  源左衛門新田（差間町会）
   */
  GenzaemonShindenSashimaChokai = "GenzaemonShindenSashimaChokai",

  /**
   *  源左衛門新田（差間町会を除く）
   */
  GenzaemonShindenOtherZone = "GenzaemonShindenOtherZone",

  /**
   *  神戸（神根）
   */
  GoudoKamine = "GoudoKamine",

  /**
   *  小谷場
   */
  Koyaba = "Koyaba",

  /**
   *  コンフォール西鳩ヶ谷
   */
  ConforeNishiHatogaya = "ConforeNishiHatogaya",

  /**
   *  コンフォール東鳩ヶ谷
   */
  ConforeHigashiHatogaya = "ConforeHigashiHatogaya",

  /**
   *  在家町
   */
  ZaikeCho = "ZaikeCho",

  /**
   *  幸町１～３丁目
   */
  SaiwaiCho1to3 = "SaiwaiCho1to3",

  /**
   *  栄町１～３丁目
   */
  SakaeCho1to3 = "SakaeCho1to3",

  /**
   *  坂下町１・２丁目
   */
  SakashitaCho1to2 = "SakashitaCho1to2",

  /**
   *  坂下町３丁目
   */
  SakashitaCho3 = "SakashitaCho3",

  /**
   *  坂下町４丁目
   */
  SakashitaCho4 = "SakashitaCho4",

  /**
   *  桜町１・２丁目
   */
  SakuraCho1to2 = "SakuraCho1to2",

  /**
   *  桜町３～５丁目（コンフォール東鳩ヶ谷を除く）
   */
  SakuraCho3to5 = "SakuraCho3to5",

  /**
   *  桜町６丁目
   */
  SakuraCho6 = "SakuraCho6",

  /**
   *  差間
   */
  Sashima = "Sashima",

  /**
   *  差間１～３丁目
   */
  Sashima1to3 = "Sashima1to3",

  /**
   *  里（コンフォール西鳩ヶ谷を除く）
   */
  Sato = "Sato",

  /**
   *  芝
   */
  Shiba = "Shiba",

  /**
   *  芝１～５丁目
   */
  Shiba1to5 = "Shiba1to5",

  /**
   *  芝下１～３丁目
   */
  ShibaShimo1to3 = "ShibaShimo1to3",

  /**
   *  芝新町
   */
  ShibaShinmachi = "ShibaShinmachi",

  /**
   *  芝園町
   */
  ShibazonoCho = "ShibazonoCho",

  /**
   *  芝高木１・２丁目
   */
  ShibaTakagi1to2 = "ShibaTakagi1to2",

  /**
   *  芝塚原１・２丁目
   */
  ShibaTsukabara1to2 = "ShibaTsukabara1to2",

  /**
   *  芝中田１・２丁目
   */
  ShibaNakada1to2 = "ShibaNakada1to2",

  /**
   *  芝西１・２丁目
   */
  ShibaNishi1to2 = "ShibaNishi1to2",

  /**
   *  芝東町
   */
  ShibaHigashiCho = "ShibaHigashiCho",

  /**
   *  芝樋ノ爪１・２丁目
   */
  ShibaHinotsume1to2 = "ShibaHinotsume1to2",

  /**
   *  芝富士１・２丁目
   */
  ShibaFuji1to2 = "ShibaFuji1to2",

  /**
   *  芝宮根町
   */
  ShibaMiyaneCho = "ShibaMiyaneCho",

  /**
   *  末広１～３丁目
   */
  Suehiro1to3 = "Suehiro1to3",

  /**
   *  長蔵１～３丁目
   */
  Chozo1to3 = "Chozo1to3",

  /**
   *  長蔵新田
   */
  ChozoShinden = "ChozoShinden",

  /**
   *  辻
   */
  Tsuji = "Tsuji",

  /**
   *  藤兵衛新田
   */
  TobeShinden = "TobeShinden",

  /**
   *  戸塚１～６丁目
   */
  Tozuka1to6 = "Tozuka1to6",

  /**
   *  戸塚境町
   */
  TozukasakaiCho = "TozukasakaiCho",

  /**
   *  戸塚鋏町
   */
  TozukahasamiCho = "TozukahasamiCho",

  /**
   *  戸塚東１～４丁目
   */
  TozukaHigashi1to4 = "TozukaHigashi1to4",

  /**
   *  戸塚南１～５丁目
   */
  TozukaMinami1to5 = "TozukaMinami1to5",

  /**
   *  中青木１～５丁目
   */
  NakaAoki1to5 = "NakaAoki1to5",

  /**
   *  仲町
   */
  NakaCho = "NakaCho",

  /**
   *  並木１～４丁目
   */
  Namiki1to4 = "Namiki1to4",

  /**
   *  並木元町
   */
  NamikiMotomachi = "NamikiMotomachi",

  /**
   *  新堀
   */
  Nihori = "Nihori",

  /**
   *  新堀町
   */
  NihoriCho = "NihoriCho",

  /**
   *  西青木１～５丁目
   */
  NishiAoki1to5 = "NishiAoki1to5",

  /**
   *  西新井宿
   */
  NishiAraijuku = "NishiAraijuku",

  /**
   *  西川口１～６丁目
   */
  NishiKawaguchi1to6 = "NishiKawaguchi1to6",

  /**
   *  西立野（戸塚）
   */
  NishiTatenoTozuka = "NishiTatenoTozuka",

  /**
   *  榛松
   */
  Haematsu = "Haematsu",

  /**
   *  榛松１～３丁目
   */
  Haematsu1to3 = "Haematsu1to3",

  /**
   *  蓮沼
   */
  Hasunuma = "Hasunuma",

  /**
   *  八幡木１・２丁目
   */
  Hachimangi1to2 = "Hachimangi1to2",

  /**
   *  八幡木３丁目
   */
  Hachimangi3 = "Hachimangi3",

  /**
   *  鳩ヶ谷本町１丁目
   */
  HatogayaHoncho1 = "HatogayaHoncho1",

  /**
   *  鳩ヶ谷本町２丁目
   */
  HatogayaHoncho2 = "HatogayaHoncho2",

  /**
   *  鳩ヶ谷本町３・４丁目
   */
  HatogayaHoncho3to4 = "HatogayaHoncho3to4",

  /**
   *  鳩ヶ谷緑町１・２丁目
   */
  HatogayaMidoriCho1to2 = "HatogayaMidoriCho1to2",

  /**
   *  原町
   */
  Haramachi = "Haramachi",

  /**
   *  東内野
   */
  HigashiUchino = "HigashiUchino",

  /**
   *  東貝塚
   */
  HigashiKaizuka = "HigashiKaizuka",

  /**
   *  東川口１～６丁目
   */
  HigashiKawaguchi1to6 = "HigashiKawaguchi1to6",

  /**
   *  東本郷
   */
  HigashiHongo = "HigashiHongo",

  /**
   *  東本郷１・２丁目
   */
  HigashiHongo1to2 = "HigashiHongo1to2",

  /**
   *  東領家１～５丁目
   */
  HigashiRyoke1to5 = "HigashiRyoke1to5",

  /**
   *  舟戸町
   */
  FunatoCho = "FunatoCho",

  /**
   *  本町１～４丁目
   */
  HonCho1to4 = "HonCho1to4",

  /**
   *  本蓮１～４丁目
   */
  Honbasu1to4 = "Honbasu1to4",

  /**
   *  本前川１・２丁目
   */
  Honmaekawa1to2 = "Honmaekawa1to2",

  /**
   *  本前川３丁目（根岸第１町会）
   */
  Honmaekawa3NegishidaiichiChokai = "Honmaekawa3NegishidaiichiChokai",

  /**
   *  本前川３丁目（根岸第１町会を除く）
   */
  Honmaekawa3OtherZone = "Honmaekawa3OtherZone",

  /**
   *  前上町
   */
  MaekamiCho = "MaekamiCho",

  /**
   *  前川１～４丁目
   */
  Maekawa1to4 = "Maekawa1to4",

  /**
   *  前田
   */
  Maeta = "Maeta",

  /**
   *  前野宿
   */
  Maenoshuku = "Maenoshuku",

  /**
   *  道合
   */
  Michiai = "Michiai",

  /**
   *  三ツ和１～３丁目
   */
  Mitsuwa1to3 = "Mitsuwa1to3",

  /**
   *  緑町
   */
  MidoriCho = "MidoriCho",

  /**
   *  南町１・２丁目
   */
  MinamiCho1to2 = "MinamiCho1to2",

  /**
   *  南鳩ヶ谷１・２丁目
   */
  MinamiHatogaya1to2 = "MinamiHatogaya1to2",

  /**
   *  南鳩ヶ谷３・４丁目
   */
  MinamiHatogaya3to4 = "MinamiHatogaya3to4",

  /**
   *  南鳩ヶ谷５・６丁目
   */
  MinamiHatogaya5to6 = "MinamiHatogaya5to6",

  /**
   *  南鳩ヶ谷７丁目
   */
  MinamiHatogaya7 = "MinamiHatogaya7",

  /**
   *  南鳩ヶ谷８丁目
   */
  MinamiHatogaya8 = "MinamiHatogaya8",

  /**
   *  南前川１・２丁目
   */
  MinamiMaekawa1to2 = "MinamiMaekawa1to2",

  /**
   *  峯
   */
  Mine = "Mine",

  /**
   *  宮町
   */
  MiyaCho = "MiyaCho",

  /**
   *  元郷１～６丁目
   */
  Motogo1to6 = "Motogo1to6",

  /**
   *  柳崎１～５丁目
   */
  Yanagisaki1to5 = "Yanagisaki1to5",

  /**
   *  柳根町
   */
  YananeCho = "YananeCho",

  /**
   *  弥平１～４丁目
   */
  Yahei1to4 = "Yahei1to4",

  /**
   *  領家１～５丁目
   */
  Ryoke1to5 = "Ryoke1to5",
}