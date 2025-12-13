import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../i18n';
import { getTranslation } from '../i18n';
import { products } from '../data/products';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tp: (productId: string, fallbackName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'de';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const productNameMap = useMemo(() => {
    // Translations for each language: de -> en, vi, zh
    const translations: Record<string, { en: string; vi: string; zh: string }> = {
      // fruits
      erdbeer: { en: 'Strawberry', vi: 'Dâu', zh: '草莓' },
      erdbeere: { en: 'Strawberry', vi: 'Dâu', zh: '草莓' },
      erdbeer_: { en: 'Strawberry ', vi: 'Dâu ', zh: '草莓 ' },
      apfel: { en: 'Apple', vi: 'Táo', zh: '苹果' },
      ananas: { en: 'Pineapple', vi: 'Dứa', zh: '菠萝' },
      mango: { en: 'Mango', vi: 'Xoài', zh: '芒果' },
      pfirsich: { en: 'Peach', vi: 'Đào', zh: '桃子' },
      pfirsisch: { en: 'Peach', vi: 'Đào', zh: '桃子' },
      melone: { en: 'Melon', vi: 'Dưa', zh: '瓜' },
      wassermelone: { en: 'Watermelon', vi: 'Dưa hấu', zh: '西瓜' },
      honigmelone: { en: 'Honeydew', vi: 'Dưa lưới', zh: '蜜瓜' },
      traube: { en: 'Grape', vi: 'Nho', zh: '葡萄' },
      trauben: { en: 'Grape', vi: 'Nho', zh: '葡萄' },
      kirsche: { en: 'Cherry', vi: 'Anh đào', zh: '樱桃' },
      kirsch: { en: 'Cherry', vi: 'Anh đào', zh: '樱桃' },
      kiwi: { en: 'Kiwi', vi: 'Kiwi', zh: '猕猴桃' },
      lychee: { en: 'Lychee', vi: 'Vải', zh: '荔枝' },
      litsch: { en: 'Lychee', vi: 'Vải', zh: '荔枝' },
      lichi: { en: 'Lychee', vi: 'Vải', zh: '荔枝' },
      zitrone: { en: 'Lemon', vi: 'Chanh', zh: '柠檬' },
      limette: { en: 'Lime', vi: 'Chanh tây', zh: '酸橙' },
      zitrus: { en: 'Citrus', vi: 'Cam quýt', zh: '柑橘' },
      orange: { en: 'Orange', vi: 'Cam', zh: '橙子' },
      himbeer: { en: 'Raspberry', vi: 'Mâm xôi', zh: '树莓' },
      himbeere: { en: 'Raspberry', vi: 'Mâm xôi', zh: '树莓' },
      brombeer: { en: 'Blackberry', vi: 'Dâu đen', zh: '黑莓' },
      blaubeer: { en: 'Blueberry', vi: 'Việt quất', zh: '蓝莓' },
      heidelbeer: { en: 'Blueberry', vi: 'Việt quất', zh: '蓝莓' },
      passionsfrucht: { en: 'Passion Fruit', vi: 'Chanh leo', zh: '百香果' },
      maracuja: { en: 'Passion Fruit', vi: 'Chanh leo', zh: '百香果' },
      kokos: { en: 'Coconut', vi: 'Dừa', zh: '椰子' },
      kokosnuss: { en: 'Coconut', vi: 'Dừa', zh: '椰子' },
      banane: { en: 'Banana', vi: 'Chuối', zh: '香蕉' },
      vanille: { en: 'Vanilla', vi: 'Vani', zh: '香草' },
      schoko: { en: 'Chocolate', vi: 'Socola', zh: '巧克力' },
      schokolade: { en: 'Chocolate', vi: 'Socola', zh: '巧克力' },
      matcha: { en: 'Matcha', vi: 'Matcha', zh: '抹茶' },
      taro: { en: 'Taro', vi: 'Khoai sọ', zh: '芋头' },
      honig: { en: 'Honey', vi: 'Mật ong', zh: '蜂蜜' },
      brauner: { en: 'Brown', vi: 'Nâu', zh: '棕色' },
      braunerzucker: { en: 'Brown Sugar', vi: 'Đường nâu', zh: '黑糖' },
      zucker: { en: 'Sugar', vi: 'Đường', zh: '糖' },
      rohrzucker: { en: 'Cane Sugar', vi: 'Đường mía', zh: '甘蔗糖' },
      zimt: { en: 'Cinnamon', vi: 'Quế', zh: '肉桂' },
      milch: { en: 'Milk', vi: 'Sữa', zh: '牛奶' },
      tee: { en: 'Tea', vi: 'Trà', zh: '茶' },
      schwarztee: { en: 'Black Tea', vi: 'Trà đen', zh: '红茶' },
      gruen: { en: 'Green', vi: 'Xanh', zh: '绿色' },
      grün: { en: 'Green', vi: 'Xanh', zh: '绿色' },
      jasmin: { en: 'Jasmine', vi: 'Lài', zh: '茉莉' },
      oolong: { en: 'Oolong', vi: 'Oolong', zh: '乌龙茶' },
      assam: { en: 'Assam', vi: 'Assam', zh: '阿萨姆茶' },
      earl: { en: 'Earl', vi: 'Earl', zh: '伯爵' },
      grey: { en: 'Grey', vi: 'Xám', zh: '灰色' },
      crystal: { en: 'Crystal', vi: 'Pha lê', zh: '水晶' },
      jelly: { en: 'Jelly', vi: 'Thạch', zh: '果冻' },
      pulver: { en: 'Powder', vi: 'Bột', zh: '粉' },
      sirup: { en: 'Syrup', vi: 'Siru', zh: '糖浆' },
      popping: { en: 'Popping', vi: 'Nổ', zh: '爆爆' },
      boba: { en: 'Boba', vi: 'Boba', zh: '波霸' },
      tapioka: { en: 'Tapioca', vi: 'Bánh tráng', zh: '珍珠' },
      diy: { en: 'DIY', vi: 'DIY', zh: 'DIY' },
      kit: { en: 'Kit', vi: 'Bộ', zh: '套装' },
      kaffee: { en: 'Coffee', vi: 'Cà phê', zh: '咖啡' },
      coffee: { en: 'Coffee', vi: 'Cà phê', zh: '咖啡' },
      mate: { en: 'Mate', vi: 'Mate', zh: '玛黛茶' },
      sahne: { en: 'Cream', vi: 'Kem', zh: '奶油' },
      creamer: { en: 'Creamer', vi: 'Kem bơ', zh: '奶精' },
      dairy: { en: 'Dairy', vi: 'Sữa', zh: '乳制品' },
      juice: { en: 'Juice', vi: 'Nước trái cây', zh: '果汁' },
      ball: { en: 'Ball', vi: 'Viên', zh: '球' },
      bubble: { en: 'Bubble', vi: 'Bọt', zh: '珠' },
      bubbletea: { en: 'Bubble Tea', vi: 'Trà nước', zh: '增珠奶茶' },
      // additional fruits and flavors
      drachenfrucht: { en: 'Dragon Fruit', vi: 'Thanh long', zh: '火龙果' },
      granatapfel: { en: 'Pomegranate', vi: 'Lựu', zh: '石榴' },
      lavendel: { en: 'Lavender', vi: 'Oải hương', zh: '薰衣草' },
      rose: { en: 'Rose', vi: 'Hoa hồng', zh: '玫瑰' },
      guave: { en: 'Guava', vi: 'Ổi', zh: '番石榴' },
      grapefruit: { en: 'Grapefruit', vi: 'Bưởi', zh: '葡萄柚' },
      hibiskus: { en: 'Hibiscus', vi: 'Hoa dâm bụt', zh: '木槿花' },
      karotte: { en: 'Carrot', vi: 'Cà rốt', zh: '胡萝卜' },
      kumquat: { en: 'Kumquat', vi: 'Tắc', zh: '金桔' },
      yuzu: { en: 'Yuzu', vi: 'Yuzu', zh: '柚子' },
      avocado: { en: 'Avocado', vi: 'Bơ', zh: '牛油果' },
      brûlée: { en: 'Brulee', vi: 'Brûlée', zh: '焦糖' },
      crème: { en: 'Cream', vi: 'Kem', zh: '奶油' },
      joghurt: { en: 'Yogurt', vi: 'Sữa chua', zh: '酸奶' },
      kirschblüten: { en: 'Cherry Blossom', vi: 'Hoa anh đào', zh: '樱花' },
      kürbis: { en: 'Pumpkin', vi: 'Bí ngô', zh: '南瓜' },
      meeressalz: { en: 'Sea Salt', vi: 'Muối biển', zh: '海盐' },
      süßkartoffel: { en: 'Sweet Potato', vi: 'Khoai lang', zh: '红薯' },
      gelee: { en: 'Jelly', vi: 'Thạch', zh: '果冻' },
      schokoladen: { en: 'Chocolate', vi: 'Socola', zh: '巧克力' },
      composite: { en: 'Composite', vi: 'Hỗn hợp', zh: '综合' },
      gemischte: { en: 'Mixed', vi: 'Hỗn hợp', zh: '混合' },
      aromatisiert: { en: 'Flavored', vi: 'Có hương vị', zh: '调味' },
      ceylon: { en: 'Ceylon', vi: 'Ceylon', zh: '锡兰' },
      geröstet: { en: 'Roasted', vi: 'Rang', zh: '烘焙' },
      smaragd: { en: 'Emerald', vi: 'Lục bảo', zh: '翡翠' },
      grüntee: { en: 'Green Tea', vi: 'Trà xanh', zh: '绿茶' },
      // tea types and preparations
      shaker: { en: 'Shaker', vi: 'Shaker', zh: '摇杯' },
      kocher: { en: 'Cooker', vi: 'Nồi nấu', zh: '煮杯机' },
      original: { en: 'Original', vi: 'Nguyên bản', zh: '原味' },
      mix: { en: 'Mix', vi: 'Trộn', zh: '混合' },
      topping: { en: 'Topping', vi: 'Topping', zh: '配料' },
      _topping: { en: 'Topping', vi: 'Topping', zh: '配料' },
      classic: { en: 'Classic', vi: 'Cổ điển', zh: '经典' },
      klassisch: { en: 'Classic', vi: 'Cổ điển', zh: '经典' },
      schnell: { en: 'Quick', vi: 'Nhanh', zh: '快速' },
      premium: { en: 'Premium', vi: 'Premium', zh: '高级' },
      reines: { en: 'Pure', vi: 'Tinh khiết', zh: '纯正' },
      // equipment
      versiegelungsmaschine: { en: 'Sealing Machine', vi: 'Máy dán bao', zh: '封口机' },
      becherversiegelungsmaschine: { en: 'Cup Sealing Machine', vi: 'Máy dán cốc', zh: '杯子封口机' },
      eiswürfelmaschine: { en: 'Ice Maker', vi: 'Máy làm đá', zh: '制冰机' },
      flachdeckel: { en: 'Flat Lid', vi: 'Nắp phẳng', zh: '平盖' },
      kuppeldeckel: { en: 'Dome Lid', vi: 'Nắp cầu', zh: '凸盖' },
      cocktailrührer: { en: 'Cocktail Stirrer', vi: 'Cây khuấy', zh: '搅拌棒' },
      blender: { en: 'Blender', vi: 'Máy xay sinh tố', zh: '料理机' },
      smoothie: { en: 'Smoothie', vi: 'Sinh tố', zh: '思慕雪' },
      maschine: { en: 'Machine', vi: 'Máy', zh: '机器' },
      flüssigzucker: { en: 'Liquid Sugar', vi: 'Đường lỏng', zh: '液糖' },
      portionierer: { en: 'Dispenser', vi: 'Bộ định lượng', zh: '分配器' },
      gummilöffel: { en: 'Silicone Spoon', vi: 'Muỗng silicon', zh: '硅胶勺' },
      messbecher: { en: 'Measuring Cup', vi: 'Cốc đo lường', zh: '量勺' },
      netzsieb: { en: 'Net Strainer', vi: 'Sàng lưới', zh: '网状滤器' },
      sieb: { en: 'Strainer', vi: 'Sàng', zh: '滤网' },
      becher: { en: 'Cup', vi: 'Cốc', zh: '杯子' },
      pumpenknopf: { en: 'Pump', vi: 'Bơm', zh: '泵' },
      plastik: { en: 'Plastic', vi: 'Nhựa', zh: '塑料' },
      eisschaufel: { en: 'Ice Scoop', vi: 'Xúc đá', zh: '冰铲' },
      pudding: { en: 'Pudding', vi: 'Pudding', zh: '布丁' },
      löffel: { en: 'Spoon', vi: 'Muỗng', zh: '勺子' },
      behälter: { en: 'Container', vi: 'Thùng chứa', zh: '容器' },
      thermometer: { en: 'Thermometer', vi: 'Nhiệt kế', zh: '温度计' },
      thermotopf: { en: 'Thermal Pot', vi: 'Ấm giữ nhiệt', zh: '保温桶' },
      ausguss: { en: 'Spout', vi: 'Vòi', zh: '壶嘴' },
      versiegelungsfolie: { en: 'Sealing Film', vi: 'Màng dán', zh: '封口膜' },
      zeitschaltuhr: { en: 'Timer', vi: 'Bộ định thời', zh: '定时器' },
      trinkhalm: { en: 'Straw', vi: 'Ống hút', zh: '吸管' },
      trinkhalme: { en: 'Straws', vi: 'Ống hút', zh: '吸管' },
    };

    const transliterateToLang = (text: string, lang: 'en' | 'vi' | 'zh') => {
      let out = text;
      // normalize to lowercase for replacement
      Object.entries(translations).forEach(([de, trans]) => {
        const regex = new RegExp(de, 'gi');
        out = out.replace(regex, trans[lang]);
      });
      // tidy double spaces
      return out.replace(/\s+/g, ' ').trim();
    };

    const map: Record<string, { de: string; en: string; vi: string; zh: string }> = {};
    products.forEach((p) => {
      const enName = transliterateToLang(p.name, 'en');
      const viName = transliterateToLang(p.name, 'vi');
      const zhName = transliterateToLang(p.name, 'zh');
      map[p.id] = {
        de: p.name,
        en: enName,
        vi: viName,
        zh: zhName,
      };
    });
    return map;
  }, []);

  const t = (key: string) => {
    return getTranslation(language, key as any);
  };

  const tp = (productId: string, fallbackName: string) => {
    // 1) explicit translations file
    const translated = getTranslation(language, productId as any);
    if (translated && translated !== productId) return translated;

    // 2) auto map from products
    const auto = productNameMap[productId]?.[language];
    if (auto) return auto;

    // 3) fallback to provided name
    return fallbackName;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tp }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
