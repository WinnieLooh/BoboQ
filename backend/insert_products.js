// This script will insert all products into the PostgreSQL database with UUIDs and imageUrl field.
const { pool } = require('./postgres');
const { v4: uuidv4 } = require('uuid');

// All products, grouped by category, no id field, use imageUrl
const products = [
  // Pop Ball
  { name: 'Ananas - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/ananas.png', category: 'boba', description: 'Erfrischende Ananas Popping Boba mit tropischem Geschmack. Perfekt für sommerliche Bubble Tea Kreationen.' },
  { name: 'Apfel - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/apfel.png', category: 'boba', description: 'Knackig-frische Apfel Popping Boba mit süß-säuerlichem Aroma. Ideal für klassische Frucht-Tees.' },
  { name: 'Banane - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/banane.png', category: 'boba', description: 'Cremige Bananen Popping Boba mit mildem, süßem Geschmack. Großartig für Milchtee-Variationen.' },
  { name: 'Brauner Zucker - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/brauner_zucker.png', category: 'boba', description: 'Karamellisierter brauner Zucker Popping Boba mit reichem, süßem Geschmack. Der Klassiker für authentischen Bubble Tea.' },
  { name: 'Drachenfrucht - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/drachenfrucht.png', category: 'boba', description: 'Exotische Drachenfrucht Popping Boba mit mildem, leicht süßem Aroma und leuchtender Farbe.' },
  { name: 'Erdbeer - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/erdbeer.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Granatapfel - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/granatapfel.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Heidelbeer - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/heidelbeer.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Himbeer - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/himbeer.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Honeydew - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/honeydew.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Kirsch - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/kirsch.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Kiwi - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/kiwi.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Kokosnuss - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/kokosnuss.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Lavendel - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/lavendel.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Litschi - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/litschi.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Mango - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/mango.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Maracuja - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/maracuja.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Pfirsich - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/pfirsisch.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Schokolade - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/schokolade.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Traube - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/traube.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Wassermelone - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/wassermelone.png', category: 'boba', description: 'PLACEHOLDER' },
  { name: 'Zitrone - Pop Ball', price: 4.9, imageUrl: 'boboq_popball/zitrone.png', category: 'boba', description: 'PLACEHOLDER' },
  // Syrup
  { name: 'Karotte-Ananas Sirup', price: 6.5, imageUrl: 'boboq_syrup/karotte_ananas.png', category: 'sirup', description: 'Einzigartige Karotte-Ananas Kombination mit süßem, fruchtigem Geschmack. Überraschend lecker!' },
  { name: 'Kirsch Sirup', price: 6.5, imageUrl: 'boboq_syrup/kirsch.png', category: 'sirup', description: 'Vollmundiger Kirsch Sirup mit saftigem Steinobst-Aroma. Ein zeitloser Klassiker.' },
  { name: 'Kiwi Sirup', price: 6.5, imageUrl: 'boboq_syrup/kiwi.png', category: 'sirup', description: 'Fruchtig-säuerlicher Kiwi Sirup mit tropischem Touch. Bringt Frische in jeden Drink.' },
  { name: 'Kumquat Sirup', price: 6.5, imageUrl: 'boboq_syrup/kumquat.png', category: 'sirup', description: 'Zitrusartiger Kumquat Sirup mit herb-süßem Profil. Perfekt für asiatisch inspirierte Tees.' },
  { name: 'Litschi Sirup', price: 6.5, imageUrl: 'boboq_syrup/litschi.png', category: 'sirup', description: 'Exotischer Litschi Sirup mit süßem, blumigem Geschmack. Ein Must-Have für Bubble Tea Fans.' },
  { name: 'Ananas Sirup', price: 6.5, imageUrl: 'boboq_syrup/ananas.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Apfel Sirup', price: 6.5, imageUrl: 'boboq_syrup/apfel.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Brauner Zucker Sirup', price: 6.5, imageUrl: 'boboq_syrup/brauner_zucker.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Drachenfrucht Sirup', price: 6.5, imageUrl: 'boboq_syrup/drachenfrucht.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Erdbeer Sirup', price: 6.5, imageUrl: 'boboq_syrup/erdbeer.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Fructose Sirup', price: 6.5, imageUrl: 'boboq_syrup/fructose.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Grapefruit Sirup', price: 6.5, imageUrl: 'boboq_syrup/grapefruit.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Guave Sirup', price: 6.5, imageUrl: 'boboq_syrup/guave.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Heidelbeere Sirup', price: 6.5, imageUrl: 'boboq_syrup/heidelbeere.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Hibiskus Sirup', price: 6.5, imageUrl: 'boboq_syrup/hibiskus.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Himbeer Sirup', price: 6.5, imageUrl: 'boboq_syrup/himbeer.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Honeydew Sirup', price: 6.5, imageUrl: 'boboq_syrup/honeydew.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Mango Sirup', price: 6.5, imageUrl: 'boboq_syrup/mango.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Maracuja Sirup', price: 6.5, imageUrl: 'boboq_syrup/maracuja.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Pfirsich Sirup', price: 6.5, imageUrl: 'boboq_syrup/pfirsisch.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Rose Sirup', price: 6.5, imageUrl: 'boboq_syrup/rose.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Traube Sirup', price: 6.5, imageUrl: 'boboq_syrup/traube.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Wassermelone Sirup', price: 6.5, imageUrl: 'boboq_syrup/wassermelone.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Weiße Pfirsich Sirup', price: 6.5, imageUrl: 'boboq_syrup/weiße_pfirsisch.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Yuzu Honig Sirup', price: 6.5, imageUrl: 'boboq_syrup/yuzu_honig.png', category: 'sirup', description: 'PLACEHOLDER' },
  { name: 'Zitrone Sirup', price: 6.5, imageUrl: 'boboq_syrup/zitrone.png', category: 'sirup', description: 'PLACEHOLDER' },
  // Crystal Ball
  { name: 'Brauner Zucker Crystal Ball', price: 8.9, imageUrl: 'boboq_Han_Tian_Crystal-Ball/brauner_zucker.png', category: 'crystal', description: 'Transparente Crystal Balls mit Karamell-Aroma. Optisch ansprechend und lecker.' },
  { name: 'Gelee Crystal Ball', price: 8.9, imageUrl: 'boboq_Han_Tian_Crystal-Ball/gelee.png', category: 'crystal', description: 'Klassische Crystal Balls mit neutralem Geschmack. Perfekt für jede Kombination.' },
  { name: 'Kirschblüten Crystal Ball', price: 9.5, imageUrl: 'boboq_Han_Tian_Crystal-Ball/kirschblüten.png', category: 'crystal', description: 'Elegante Kirschblüten Crystal Balls mit zartem, blumigem Aroma. Für besondere Anlässe.' },
  { name: 'Litschi Crystal Ball', price: 8.9, imageUrl: 'boboq_Han_Tian_Crystal-Ball/litschi.png', category: 'crystal', description: 'Exotische Litschi Crystal Balls mit süßem Geschmack. Beliebter asiatischer Klassiker.' },
  { name: 'Mango Crystal Ball', price: 8.9, imageUrl: 'boboq_Han_Tian_Crystal-Ball/mango.png', category: 'crystal', description: 'Tropische Mango Crystal Balls mit fruchtigem Aroma. Visuell beeindruckend.' },
  { name: 'Matcha Crystal Ball', price: 9.5, imageUrl: 'boboq_Han_Tian_Crystal-Ball/matcha.png', category: 'crystal', description: 'PLACEHOLDER' },
  { name: 'Taro Crystal Ball', price: 9.5, imageUrl: 'boboq_Han_Tian_Crystal-Ball/taro.png', category: 'crystal', description: 'PLACEHOLDER' },
  // Jelly
  { name: 'Apfel Jelly', price: 5.9, imageUrl: 'boboq_jelly/apfel.png', category: 'jelly', description: 'Fruchtige Apfel Jelly-Würfel mit erfrischendem Geschmack. Topping-Alternative zu Boba.' },
  { name: 'Erdbeer Jelly', price: 5.9, imageUrl: 'boboq_jelly/erdbeer.png', category: 'jelly', description: 'Süße Erdbeer Jelly-Würfel mit intensivem Beerenaroma. Beliebt bei allen Altersgruppen.' },
  { name: 'Litschi Jelly', price: 5.9, imageUrl: 'boboq_jelly/litschi.png', category: 'jelly', description: 'Exotische Litschi Jelly-Würfel mit süßem, blumigem Geschmack. Ein asiatischer Klassiker.' },
  { name: 'Mango Jelly', price: 5.9, imageUrl: 'boboq_jelly/mango.png', category: 'jelly', description: 'Tropische Mango Jelly-Würfel mit fruchtigem Aroma. Perfekt für sommerliche Drinks.' },
  { name: 'Maracuja Jelly', price: 5.9, imageUrl: 'boboq_jelly/maracuja.png', category: 'jelly', description: 'Säuerlich-frische Maracuja Jelly-Würfel mit tropischem Kick. Erfrischend anders.' },
  { name: 'Brauner Zucker Jelly', price: 5.9, imageUrl: 'boboq_jelly/brauner_zucker.png', category: 'jelly', description: 'PLACEHOLDER' },
  { name: 'Originalgeschmack Jelly', price: 5.9, imageUrl: 'boboq_jelly/originalgeschmack.png', category: 'jelly', description: 'PLACEHOLDER' },
  { name: 'Topping Jelly', price: 5.9, imageUrl: 'boboq_jelly/_topping.png', category: 'jelly', description: 'PLACEHOLDER' },
  // Jelly Juice
  { name: 'Apfel Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/apfel.png', category: 'jellyjuice', description: 'Saftige Apfel Jelly mit Fruchtsaft gefüllt. Platzt im Mund für ein besonderes Geschmackserlebnis.' },
  { name: 'Erdbeer Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/erdbeer.png', category: 'jellyjuice', description: 'Fruchtige Erdbeer Jelly mit echtem Fruchtsaft. Explosiv lecker.' },
  { name: 'Honeydew Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/honeydew.png', category: 'jellyjuice', description: 'Erfrischende Honigmelonen Jelly mit süßem Saft. Perfekt für Sommerdrinks.' },
  { name: 'Joghurt Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/joghurt.png', category: 'jellyjuice', description: 'Cremige Joghurt Jelly für säuerlich-frische Drinks. Einzigartige Textur.' },
  { name: 'Litschi Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/litschi.png', category: 'jellyjuice', description: 'Exotische Litschi Jelly mit tropischem Saft. Der Klassiker unter den Jelly Juices.' },
  { name: 'Pfirsich Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/pfirsisch.png', category: 'jellyjuice', description: 'PLACEHOLDER' },
  { name: 'Mango Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/mango.png', category: 'jellyjuice', description: 'PLACEHOLDER' },
  { name: 'Maracuja Jelly Juice', price: 7.9, imageUrl: 'boboq_jellyjuice/maracuja.png', category: 'jellyjuice', description: 'PLACEHOLDER' },
  // Powder
  { name: 'Ananas Pulver', price: 12.9, imageUrl: 'boboq_powder/ananass.png', category: 'pulver', description: 'Tropisches Ananas Pulver für cremige Frucht-Smoothies. Einfach mit Milch oder Wasser mixen.' },
  { name: 'Avocado Pulver', price: 14.9, imageUrl: 'boboq_powder/avocado.png', category: 'pulver', description: 'Cremiges Avocado Pulver für gesunde, nährstoffreiche Drinks. Beliebt in Asien.' },
  { name: 'Crème Brûlée Pulver', price: 13.9, imageUrl: 'boboq_powder/creme_bruelee.png', category: 'pulver', description: 'Dekadentes Crème Brûlée Pulver mit Karamell-Vanille-Aroma. Für Dessert- Liebhaber.' },
  { name: 'Dairy Creamer', price: 11.9, imageUrl: 'boboq_powder/dairy creamer.png', category: 'pulver', description: 'Vielseitiger Milchpulver-Creamer für cremige Milchtees. Laktosefrei. Die Basis für viele Rezepte.' },
  { name: 'Erdbeer Pulver', price: 12.9, imageUrl: 'boboq_powder/erdbeer.png', category: 'pulver', description: 'Fruchtiges Erdbeer Pulver mit intensivem Beerenaroma. Perfekt für Smoothies und Milchshakes.' },
  { name: 'Honeydew Pulver', price: 12.9, imageUrl: 'boboq_powder/honeydew.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Joghurt Pulver', price: 12.9, imageUrl: 'boboq_powder/joghurt.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Kaffee Creme Pulver', price: 13.9, imageUrl: 'boboq_powder/kaffe_creme.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Kirschblüten Pulver', price: 13.9, imageUrl: 'boboq_powder/kirschblüten.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Kokosnuss Pulver', price: 13.9, imageUrl: 'boboq_powder/kokosnuss.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Kürbis Pulver', price: 13.9, imageUrl: 'boboq_powder/kürbis.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Mango Pulver', price: 12.9, imageUrl: 'boboq_powder/mango.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Instant Matcha Pulver', price: 13.9, imageUrl: 'boboq_powder/instant_matcha.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Pures Matcha Pulver', price: 13.9, imageUrl: 'boboq_powder/matcha_pur.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Meeressalz Pulver', price: 13.9, imageUrl: 'boboq_powder/meeressalz.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Nestle Coffee-Mate', price: 13.9, imageUrl: 'boboq_powder/nestle_coffee-mate.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Pfirsich Pulver', price: 12.9, imageUrl: 'boboq_powder/pfirsisch.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Schokolade Pulver', price: 13.9, imageUrl: 'boboq_powder/schokolade.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Süßkartoffel Pulver', price: 13.9, imageUrl: 'boboq_powder/süßkartoffel.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Taro Pulver', price: 13.9, imageUrl: 'boboq_powder/taro.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Vanille Pulver', price: 13.9, imageUrl: 'boboq_powder/vanille.png', category: 'pulver', description: 'PLACEHOLDER' },
  { name: 'Wassermelone Pulver', price: 12.9, imageUrl: 'boboq_powder/wassermeloe.png', category: 'pulver', description: 'PLACEHOLDER' },
  // Tapioka
  { name: 'Erdbeer Tapioka', price: 7.9, imageUrl: 'tapioka/erdbeer.png', category: 'tapioka', description: 'Aromatisierte Erdbeer Tapioka-Perlen mit fruchtigem Geschmack. Bunter Hingucker im Bubble Tea.' },
  { name: 'Mango Tapioka', price: 7.9, imageUrl: 'tapioka/mango.png', category: 'tapioka', description: 'Tropische Mango Tapioka-Perlen mit süßem Fruchtaroma. Perfekt für exotische Tee-Kreationen.' },
  { name: 'Instant Tapioka', price: 8.9, imageUrl: 'tapioka/instant_tapioka.png', category: 'tapioka', description: 'Schnell kochende Tapioka-Perlen für die zeitsparende Zubereitung. Fertig in nur 5 Minuten.' },
  { name: 'Klassische Tapioka', price: 7.5, imageUrl: 'tapioka/tapioka.png', category: 'tapioka', description: 'Original schwarze Tapioka-Perlen für authentischen Bubble Tea. Der zeitlose Klassiker.' },
  { name: 'Taro Tapioka', price: 7.9, imageUrl: 'tapioka/taro.png', category: 'tapioka', description: 'Lila Taro Tapioka-Perlen mit süßem, nussigem Geschmack. Beliebt in Taiwan.' },
  // Tea
  { name: 'Aromatisierter Earl Grey Tee', price: 8.9, imageUrl: 'Tea/aromatisierter_earl-grey-tee.webp', category: 'tee', description: 'Klassischer Earl Grey mit Bergamotte-Aroma. Perfekt für elegante Milchtee-Kreationen.' },
  { name: 'Aromatisierter Jasmin Grüntee', price: 8.9, imageUrl: 'Tea/aromatisierter_jasmin_grüntee.png', category: 'tee', description: 'Duftender Jasmin Grüntee mit blumigem Aroma. Ein asiatischer Klassiker für Bubble Tea.' },
  { name: 'Assam Schwarztee', price: 7.9, imageUrl: 'Tea/assam_schwarztee.png', category: 'tee', description: 'Kräftiger Assam Schwarztee mit malzigem Charakter. Ideal für vollmundige Milchtees.' },
  { name: 'Ceylon Schwarztee', price: 7.9, imageUrl: 'Tea/ceylon_schwarztee.png', category: 'tee', description: 'Eleganter Ceylon Schwarztee mit leicht zitrusartigen Noten. Perfekt für klassischen Bubble Tea.' },
  { name: 'Gerösteter Oolong Tee', price: 9.9, imageUrl: 'Tea/geroesteter_oolong.png', category: 'tee', description: 'Gerösteter Oolong mit nussigen, karamelligen Noten. Premium-Qualität für Kenner.' },
  { name: 'Oolong Tee', price: 9.9, imageUrl: 'Tea/oolong.png', category: 'tee', description: 'PLACEHOLDER' },
  { name: 'Smaragd Grüntee', price: 9.9, imageUrl: 'Tea/smaragd_grüntee.png', category: 'tee', description: 'PLACEHOLDER' },
  // DIY Boba Kit
  { name: 'DIY Boba Kit Erdbeer-Maracuja-Apfel', price: 24.9, imageUrl: 'boboq_DIY-boba-kit/erdbeer_maracuja_apfel.png', category: 'diy', description: 'Komplettes DIY Kit mit Erdbeer, Maracuja und Apfel Boba. Perfekt für den Einstieg zu Hause.' },
  { name: 'DIY Boba Kit Mango-Pfirsisch-Litschi', price: 24.9, imageUrl: 'boboq_DIY-boba-kit/mango_pfirsisch_litschi.png', category: 'diy', description: 'Tropisches DIY Kit mit Mango, Pfirsisch und Litschi Boba. Alles was Sie brauchen in einem Set.' },
  { name: 'DIY Boba Kit Taro-Matcha-Vanille', price: 24.9, imageUrl: 'boboq_DIY-boba-kit/taro_matcha_vanille.png', category: 'diy', description: 'Premium DIY Kit mit Taro, Matcha und Vanille. Für anspruchsvolle Bubble Tea Fans.' },
  // Preserves
  { name: 'Aloe Vera gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/aloe-vera.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Ananas Gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/ananas_gewürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Drachenfrucht gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/drachenfrucht_gewürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Erdbeer Gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/erdbeer_gwürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Erdbeer Konfitüre', price: 7.9, imageUrl: 'boboq_preserves/erdbeer_jam.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Grapefruit Fruchtfleisch', price: 7.9, imageUrl: 'boboq_preserves/grapefruit-fruchtfleisch.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Grüne Traube Konfitüre', price: 7.9, imageUrl: 'boboq_preserves/gruene-traube_jam.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Heidelbeer Gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/heidelbeer_gewürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Heidelbeer Konfitüre', price: 7.9, imageUrl: 'boboq_preserves/heidelbeer_jam.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Mango Gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/mango_gewürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Mango Konfitüre', price: 7.9, imageUrl: 'boboq_preserves/mango_jam.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Passionsfrucht Fruchtfleisch', price: 7.9, imageUrl: 'boboq_preserves/maracuja_fruchtfleisch.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Passionsfrucht Konfitüre', price: 7.9, imageUrl: 'boboq_preserves/maracuja_jam.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Passionsfrucht Konfitüre Kanister', price: 7.9, imageUrl: 'boboq_preserves/maracuja_jam_kanister.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Pfirsich Gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/pfirsisch_gewürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Süße Azukibohnen', price: 7.9, imageUrl: 'boboq_preserves/süße-azückibohnen.png', category: 'preserves', description: 'PLACEHOLDER' },
  { name: 'Taro Gewürfelt', price: 7.9, imageUrl: 'boboq_preserves/taro_gewürfelt.png', category: 'preserves', description: 'PLACEHOLDER' },
  // Equipment
  { name: 'Bubble Tea Becher Gänzend', price: 19.9, imageUrl: 'equipment/becher_90-660_90-500_glänzend.png', category: 'zubehor', description: 'Professionelle Bubble Tea Becher in verschiedenen Größen. 90ml bis 660ml. Ideal für den Verkauf.' },
  { name: 'Bubble Tea Becher Matt', price: 19.9, imageUrl: 'equipment/becher_90-660_90-500_matt.png', category: 'zubehor', description: 'Professionelle Bubble Tea Becher in verschiedenen Größen. 90ml bis 660ml. Ideal für den Verkauf.' },
  { name: 'PC-Shaker', price: 19.9, imageUrl: 'equipment/PC-Shaker_530 ml,700ml.png', category: 'zubehor', description: 'Professionelle Bubble Tea Becher in verschiedenen Größen. 530ml und 700ml.' },
  { name: 'Bubble Tea Trinkhalme', price: 8.9, imageUrl: 'equipment/trinkhalm.png', category: 'zubehor', description: 'Extra-breite Trinkhalme für Bubble Tea. Perfekt für Boba und Toppings. 100 Stück.' },
  { name: 'Bubble Tea Shaker Maschine', price: 15.9, imageUrl: 'equipment/shaker_maschine.png', category: 'zubehor', description: 'Professioneller Shaker für perfekt gemixte Bubble Teas. Unverzichtbar für Baristas.' },
  { name: 'Tapioka Kocher', price: 189.0, imageUrl: 'equipment/tapioka_kocher.jpg', category: 'zubehor', description: 'Automatischer Tapioka Kocher für perfekte Perlen. Spart Zeit und garantiert gleichbleibende Qualität.' },
  { name: 'Becherversiegelungsmaschine', price: 299.0, imageUrl: 'equipment/Verschweissmaschine.jpg', category: 'zubehor', description: 'Professionelle Versiegelungsmaschine für Bubble Tea Becher. Für den professionellen Einsatz.' },
  { name: 'Flach Deckel', price: 9.9, imageUrl: 'equipment/9,5cm_flach_deckel.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Kuppel-Deckel', price: 9.9, imageUrl: 'equipment/9,5cm_kuppel-deckel.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Cocktailrührer', price: 5.9, imageUrl: 'equipment/cocktailrührer.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'E-Blenders Smoothie-Maschine', price: 199.0, imageUrl: 'equipment/e-blenders_smoothie-maschine.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Flüssigzucker Portionierer', price: 19.9, imageUrl: 'equipment/fluessigzucker-portionierer.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Gummilöffel', price: 4.9, imageUrl: 'equipment/gummilöffel.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Ice Maker', price: 49.0, imageUrl: 'equipment/ice-maker.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Messbecher', price: 7.9, imageUrl: 'equipment/messbecher.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Netzsieb Tapioka', price: 12.9, imageUrl: 'equipment/netzsieb_tapioka.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Plastik-Sieb Tapioka', price: 8.9, imageUrl: 'equipment/plastik-sieb_tapioka.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Pumpenknopf Sirup', price: 6.9, imageUrl: 'equipment/pumpenknopf_sirup.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Becher Q500 Q700', price: 29.9, imageUrl: 'equipment/q500_q700.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Eisschaufel', price: 7.9, imageUrl: 'equipment/QU019_eisschaufel.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Pudding Löffel', price: 4.9, imageUrl: 'equipment/qu036_pudding-loeffel.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Sieb Tee', price: 8.9, imageUrl: 'equipment/sieb_tee.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Tapioka Behälter', price: 19.9, imageUrl: 'equipment/tapioka_behaelter.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Thermometer', price: 9.9, imageUrl: 'equipment/thermometer.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Thermotopf mit Ausguss Kopf', price: 39.9, imageUrl: 'equipment/thermotopf_mit_ausguss_kopf_8L.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Versiegelungsfolie', price: 14.9, imageUrl: 'equipment/versiegelungsfolie_290m.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Becher YM500 YM700', price: 29.9, imageUrl: 'equipment/ym500_ym700.png', category: 'zubehor', description: 'PLACEHOLDER' },
  { name: 'Zeitschaltuhr', price: 19.9, imageUrl: 'equipment/zeitschaltuhr.jpg', category: 'zubehor', description: 'PLACEHOLDER' },
];


// Assign UUIDs to each product
products.forEach(product => product.id = uuidv4());


async function insertProducts() {
  for (const product of products) {
    await pool.query(
      `INSERT INTO products (id, name, description, price, imageUrl, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [product.id, product.name, product.description, product.price, product.imageUrl, product.category]
    );
  }
  console.log('Products inserted successfully.');
  await pool.end();
}

insertProducts().catch(err => {
  console.error('Error inserting products:', err);
});
