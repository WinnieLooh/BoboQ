export type Language = 'de' | 'en' | 'vi' | 'zh';

export const translations = {
  de: {
    // Header
    home: 'Home',
    products: 'Produkte',
    contact: 'Kontakt',
    faq: 'FAQ',
    search: 'Suchen...',
    cart: 'Warenkorb',
    articles: 'Artikel',
    
    // Cart Preview
    viewCart: 'Zum Warenkorb',
    emptyCart: 'Warenkorb ist leer',
    total: 'Gesamt',
    itemSum: 'Artikel-Summe',
    signIn: 'Anmelden',
    logout: 'Abmelden',
    moreResults: 'weitere Ergebnisse',
    noProductsFound: 'Keine Produkte gefunden',
    
    // Home Page
    welcomeTitle: 'Willkommen bei BoboQ',
    welcomeSubtitle: 'Entdecke unsere köstlichen Bubble Tea Kreationen',
    shopNow: 'Jetzt Einkaufen',
    ourCategories: 'Unsere Kategorien',
    featuredProducts: 'Bestseller Produkte',
    addToCart: 'In den Warenkorb',
    added: 'Hinzugefügt',
    
    // Shop Page
    allProducts: 'Alle Produkte',
    filterByCategory: 'Nach Kategorie filtern',
    all: 'Alle',
    
    // Product Detail
    quantity: 'Menge',
    price: 'Preis',
    description: 'Beschreibung',
    backToShop: 'Zurück zum Shop',
    detailNotFoundTitle: 'Produkt nicht gefunden',
    detailNotFoundBody: 'Das angeforderte Produkt ist nicht verfügbar. Schau dich im Shop nach weiteren Favoriten um.',
    detailBadge: 'Mehr erfahren',
    detailLead: 'Hier findest du ein paar zusätzliche Hinweise zu diesem Produkt. Wir achten auf hochwertige Zutaten, ausgewogene Süße und einen intensiven Geschmack, der perfekt zu Milch- und Fruchttees passt.',
    detailHighlight1: 'Handverlesene Zutaten und frische Verarbeitung',
    detailHighlight2: 'Ideal zum Kombinieren mit unseren Tees und Sirups',
    detailHighlight3: 'Schnell zubereitet – perfekt für einen spontanen Bubble-Tea-Moment',
    detailHighlight4: 'Mehr Ideen gefällig? Sieh dich im Shop um und stell dir deine Lieblingskombination zusammen.',
    
    // Cart Page
    yourCart: 'Ihr Warenkorb',
    product: 'Produkt',
    remove: 'Entfernen',
    subtotal: 'Zwischensumme',
    checkout: 'Zur Kasse',
    continueShopping: 'Weiter einkaufen',
    
    // Contact Page
    contactUs: 'Kontaktiere uns',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Adresse',
    
    // FAQ Page
    frequentlyAsked: 'Häufig gestellte Fragen',
    
    // Footer
    followUs: 'Folge uns',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    
    // Categories
    boba: 'Pop Ball',
    tapioka: 'Tapioka',
    tee: 'Tee',
    sirup: 'Sirup',
    zubehor: 'Zubehör',
    pulver: 'Pulver',
    jelly: 'Jelly',
    jellyjuice: 'Jelly Juice',
    crystal: 'Crystal Ball',
    diy: 'DIY Kits',
    
    // Home specific
    productsTitle: 'Produkte',
    b2bIntroTitle: 'Unser B2B-Angebot',
    b2bIntroText: 'Bei BoboQ arbeiten wir ausschließlich B2B mit Großmengen. Wir bieten hochwertige Bubble Tea Produkte und Equipment für Restaurants, Cafés und Einzelhandelsketten. Kontaktieren Sie uns für individuelle Angebote und Mengenrabatte.',
    
    // Cart specific
    yourOrder: 'Deine Bestellung',
    emptyCartMessage: 'Der Warenkorb ist leer.',
    totalAmount: 'Gesamtbetrag',
    checkoutBtn: 'Zur Kasse',
    requestQuote: 'Angebot anfordern',
    checkoutSoon: 'Checkout-Funktion kommt bald!',
    quoteSent: 'Angebotsanfrage gesendet!',
    
    // Shop specific
    allCategory: 'Alle',
    
    // Product Card
    quantityLabel: 'Menge',
    
    // Product Names
    'erdbeer-boba': 'Erdbeer Boba',
    'heidelbeer-boba': 'Heidelbeer Boba',
    'kirsche-boba': 'Kirsch Boba',
    'kiwi-boba': 'Kiwi Boba',
    'litschi-boba': 'Litschi Boba',
    'passionsfrucht-boba': 'Passionsfrucht Boba',
    'mango-boba': 'Mango Boba',
    'schwarztee': 'Schwarztee',
    'mango-sirup': 'Mango Sirup',
    'erdbeer-sirup': 'Erdbeer Sirup',
    'braunerzucker-sirup': 'Brauner Zucker Sirup',
    'melone-sirup': 'Melone Sirup',
    'passionsfrucht-sirup': 'Passionsfrucht Sirup',
    'pfirsisch-sirup': 'Pfirsisch Sirup',
    'strohhalm-set': 'Trinkhalm Set',
    
    // FAQ Page
    faqQuestion1: 'Was ist Bubble Tea?',
    faqAnswer1: 'Bubble Tea ist ein erfrischendes Getränk aus Taiwan mit Tee, Milch und essbaren Kügelchen (Boba).',
    faqQuestion2: 'Wie wird Bubble Tea zubereitet?',
    faqAnswer2: 'Der Tee wird gekocht, mit Milch oder Sirup gemischt und mit Eis und Boba-Kügelchen serviert.',
    faqQuestion3: 'Welche Sorten gibt es?',
    faqAnswer3: 'Wir bieten viele Varianten mit verschiedenen Tee-, Frucht- und Sirup-Kombinationen.',
    faqQuestion4: 'Sind die Zutaten vegan?',
    faqAnswer4: 'Viele unserer Produkte können vegan zubereitet werden. Fragen Sie bitte das Personal.',
    faqQuestion5: 'Wie lange dauert die Lieferung?',
    faqAnswer5: 'Die Lieferung dauert normalerweise 2-3 Werktage nach Bestellung.',
    faqQuestion6: 'Woher stammen die Produkte von BoboQ?',
    faqAnswer6: 'Unsere Produkte werden direkt aus Taiwan importiert und per Schiff nach Deutschland gebracht. So garantieren wir authentische Qualität und frische Zutaten.',
    faqQuestion7: 'In welchem Umkreis liefern wir?',
    faqAnswer7: 'Wir liefern im Umkreis von etwa 100 Kilometern rund um Köln aus. Für größere Entfernungen oder spezielle Anfragen kontaktieren Sie uns bitte direkt.',
    
    // Auth Pages
    login: 'Anmelden',
    register: 'Registrieren',
    loginTitle: 'Anmeldung',
    registerTitle: 'Registrierung',
    firstName: 'Vorname',
    lastName: 'Nachname',
    password: 'Passwort',
    confirmPassword: 'Passwort wiederholen',
    signUp: 'Registrieren',
    alreadyHaveAccount: 'Bereits registriert? Hier anmelden',
    noAccount: 'Noch kein Konto? Jetzt registrieren',
    loggingIn: 'Wird angemeldet...',
    signingUp: 'Wird registriert...',
    loginFailed: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.',
    registerFailed: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
    passwordMismatch: 'Passwörter stimmen nicht überein',
    passwordTooShort: 'Passwort muss mindestens 6 Zeichen lang sein',
    
    // Checkout Page
    shippingAddress: 'Lieferadresse',
    registeredCustomer: 'Registrierter Kunde',
    registerToOrder: 'Mit Ihrem BoboQ Konto bestellen',
    guestCheckout: 'Gast Bestellung',
    guestCheckoutDesc: 'Ohne Konto als Gast bestellen',
    selectCheckout: 'Zur Anmeldung',
    orderAsGuest: 'Als Gast bestellen',
    street: 'Straße und Hausnummer',
    postalCode: 'Postleitzahl',
    city: 'Stadt',
    country: 'Land',
    orderSummary: 'Bestellübersicht',
    subtotalLabel: 'Zwischensumme',
    shippingCosts: 'Versandkosten',
    totalPrice: 'Gesamtsumme',
    placeOrder: 'Bestellung abschließen',
    processing: 'Wird verarbeitet...',
    orderSuccess: 'Bestellung erfolgreich aufgegeben!',
    orderError: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    fillAllFields: 'Bitte füllen Sie alle Felder aus',
    authOrGuest: 'Bitte melden Sie sich an oder bestellen Sie als Gast',
    requiredFields: 'Bitte füllen Sie alle erforderlichen Felder aus',
    back: '← Zurück',
  },
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    faq: 'FAQ',
    search: 'Search...',
    cart: 'Cart',
    articles: 'items',
    
    // Cart Preview
    viewCart: 'View Cart',
    emptyCart: 'Cart is empty',
    total: 'Total',
    itemSum: 'Item Sum',
    signIn: 'Sign In',
    logout: 'Logout',
    moreResults: 'more results',
    noProductsFound: 'No products found',
    
    // Home Page
    welcomeTitle: 'Welcome to BoboQ',
    welcomeSubtitle: 'Discover our delicious Bubble Tea creations',
    shopNow: 'Shop Now',
    ourCategories: 'Our Categories',
    featuredProducts: 'Best Selling Products',
    addToCart: 'Add to Cart',
    added: 'Added',
    
    // Shop Page
    allProducts: 'All Products',
    filterByCategory: 'Filter by Category',
    all: 'All',
    
    // Product Detail
    quantity: 'Quantity',
    price: 'Price',
    description: 'Description',
    backToShop: 'Back to Shop',
    detailNotFoundTitle: 'Product not found',
    detailNotFoundBody: 'The requested product is not available. Browse the shop for more favorites.',
    detailBadge: 'Learn more',
    detailLead: 'Here are a few extra notes about this product. We focus on quality ingredients, balanced sweetness, and a bold flavor that pairs perfectly with milk and fruit teas.',
    detailHighlight1: 'Handpicked ingredients and fresh processing',
    detailHighlight2: 'Ideal to combine with our teas and syrups',
    detailHighlight3: 'Quick to prepare – perfect for a spontaneous bubble tea moment',
    detailHighlight4: 'Want more ideas? Browse the shop and create your favorite combo.',
    
    // Cart Page
    yourCart: 'Your Cart',
    product: 'Product',
    remove: 'Remove',
    subtotal: 'Subtotal',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    
    // Contact Page
    contactUs: 'Contact Us',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    
    // FAQ Page
    frequentlyAsked: 'Frequently Asked Questions',
    
    // Footer
    followUs: 'Follow Us',
    imprint: 'Imprint',
    privacy: 'Privacy',
    
    // Categories
    boba: 'Boba',
    tapioka: 'Tapioca',
    tee: 'Tea',
    sirup: 'Syrup',
    zubehor: 'Accessories',
    pulver: 'Powder',
    jelly: 'Jelly',
    jellyjuice: 'Jelly Juice',
    crystal: 'Crystal Ball',
    diy: 'DIY Kits',
    
    // Home specific
    productsTitle: 'Products',
    b2bIntroTitle: 'Our B2B Offering',
    b2bIntroText: 'BoboQ operates exclusively B2B with bulk quantities. We provide premium Bubble Tea products and equipment for restaurants, cafés, and retail chains. Contact us for custom quotes and volume discounts.',
    
    // Cart specific
    yourOrder: 'Your Order',
    emptyCartMessage: 'Your cart is empty.',
    totalAmount: 'Total Amount',
    checkoutBtn: 'Checkout',
    requestQuote: 'Request Quote',
    checkoutSoon: 'Checkout functionality coming soon!',
    quoteSent: 'Quotation request sent!',
    
    // Shop specific
    allCategory: 'All',
    
    // Product Card
    quantityLabel: 'Quantity',
    
    // Product Names
    'erdbeer-boba': 'Strawberry Boba',
    'heidelbeer-boba': 'Blueberry Boba',
    'kirsche-boba': 'Cherry Boba',
    'kiwi-boba': 'Kiwi Boba',
    'litschi-boba': 'Lychee Boba',
    'passionsfrucht-boba': 'Passion Fruit Boba',
    'mango-boba': 'Mango Boba',
    'schwarztee': 'Black Tea',
    'mango-sirup': 'Mango Syrup',
    'erdbeer-sirup': 'Strawberry Syrup',
    'braunerzucker-sirup': 'Brown Sugar Syrup',
    'melone-sirup': 'Melon Syrup',
    'passionsfrucht-sirup': 'Passion Fruit Syrup',
    'pfirsisch-sirup': 'Peach Syrup',
    'strohhalm-set': 'Straw Set',
    
    // FAQ Page
    faqQuestion1: 'What is Bubble Tea?',
    faqAnswer1: 'Bubble tea is a refreshing Taiwanese beverage made with tea, milk, and edible tapioca pearls (boba).',
    faqQuestion2: 'How is Bubble Tea prepared?',
    faqAnswer2: 'Tea is brewed, mixed with milk or syrup, and served with ice and boba pearls.',
    faqQuestion3: 'What varieties do you offer?',
    faqAnswer3: 'We offer many varieties with different tea, fruit, and syrup combinations.',
    faqQuestion4: 'Are the ingredients vegan?',
    faqAnswer4: 'Many of our products can be prepared vegan. Please ask our staff.',
    faqQuestion5: 'How long does shipping take?',
    faqAnswer5: 'Shipping typically takes 2-3 business days after placing your order.',
    
    // Auth Pages
    login: 'Sign In',
    register: 'Sign Up',
    loginTitle: 'Sign In',
    registerTitle: 'Sign Up',
    firstName: 'First Name',
    lastName: 'Last Name',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signUp: 'Sign Up',
    alreadyHaveAccount: 'Already registered? Sign in here',
    noAccount: 'No account yet? Sign up now',
    loggingIn: 'Signing in...',
    signingUp: 'Signing up...',
    loginFailed: 'Login failed. Please check your credentials.',
    registerFailed: 'Registration failed. Please try again later.',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters long',
    
    // Checkout Page
    shippingAddress: 'Shipping Address',
    registeredCustomer: 'Registered Customer',
    registerToOrder: 'Order with your BoboQ account',
    guestCheckout: 'Guest Order',
    guestCheckoutDesc: 'Order without an account',
    selectCheckout: 'Sign In',
    orderAsGuest: 'Order as Guest',
    street: 'Street and House Number',
    postalCode: 'Postal Code',
    city: 'City',
    country: 'Country',
    orderSummary: 'Order Summary',
    subtotalLabel: 'Subtotal',
    shippingCosts: 'Shipping Costs',
    totalPrice: 'Total Amount',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    orderSuccess: 'Order placed successfully!',
    orderError: 'An error occurred. Please try again later.',
    fillAllFields: 'Please fill in all fields',
    authOrGuest: 'Please sign in or order as guest',
    requiredFields: 'Please fill in all required fields',
    back: '← Back',
  },
  vi: {
    // Header
    home: 'Trang chủ',
    products: 'Sản phẩm',
    contact: 'Liên hệ',
    faq: 'Câu hỏi',
    search: 'Tìm kiếm...',
    cart: 'Giỏ hàng',
    articles: 'sản phẩm',
    
    // Cart Preview
    viewCart: 'Xem giỏ hàng',
    emptyCart: 'Giỏ hàng trống',
    total: 'Tổng cộng',
    itemSum: 'Tổng mặt hàng',
    signIn: 'Đăng nhập',
    logout: 'Đăng xuất',
    moreResults: 'kết quả khác',
    noProductsFound: 'Không tìm thấy sản phẩm',
    
    // Home Page
    welcomeTitle: 'Chào mừng đến BoboQ',
    welcomeSubtitle: 'Khám phá những ly trà sữa ngon tuyệt vời',
    shopNow: 'Mua ngay',
    ourCategories: 'Danh mục',
    featuredProducts: 'Sản phẩm bán chạy nhất',
    addToCart: 'Thêm vào giỏ',
    added: 'Đã thêm',
    
    // Shop Page
    allProducts: 'Tất cả sản phẩm',
    filterByCategory: 'Lọc theo danh mục',
    all: 'Tất cả',
    
    // Product Detail
    quantity: 'Số lượng',
    price: 'Giá',
    description: 'Mô tả',
    backToShop: 'Quay lại cửa hàng',
    detailNotFoundTitle: 'Không tìm thấy sản phẩm',
    detailNotFoundBody: 'Sản phẩm bạn tìm không có. Hãy xem thêm các lựa chọn khác trong cửa hàng.',
    detailBadge: 'Xem thêm',
    detailLead: 'Dưới đây là vài lưu ý thêm về sản phẩm. Chúng tôi chú trọng nguyên liệu chất lượng, độ ngọt cân bằng và hương vị đậm đà, phù hợp hoàn hảo với trà sữa và trà trái cây.',
    detailHighlight1: 'Nguyên liệu chọn lọc, chế biến tươi',
    detailHighlight2: 'Lý tưởng để kết hợp với trà và siro của chúng tôi',
    detailHighlight3: 'Pha nhanh – hoàn hảo cho khoảnh khắc bubble tea bất chợt',
    detailHighlight4: 'Muốn thêm ý tưởng? Khám phá cửa hàng và tự tạo combo yêu thích.',
    
    // Cart Page
    yourCart: 'Giỏ hàng của bạn',
    product: 'Sản phẩm',
    remove: 'Xóa',
    subtotal: 'Tạm tính',
    checkout: 'Thanh toán',
    continueShopping: 'Tiếp tục mua sắm',
    
    // Contact Page
    contactUs: 'Liên hệ với chúng tôi',
    email: 'Email',
    phone: 'Điện thoại',
    address: 'Địa chỉ',
    
    // FAQ Page
    frequentlyAsked: 'Câu hỏi thường gặp',
    
    // Footer
    followUs: 'Theo dõi chúng tôi',
    imprint: 'Thông tin',
    privacy: 'Bảo mật',
    
    // Categories
    boba: 'Boba',
    tapioka: 'Tapioca',
    tee: 'Trà',
    sirup: 'Xi-rô',
    zubehor: 'Phụ kiện',    pulver: 'Bột',
    jelly: 'Thạch',
    jellyjuice: 'Thạch nước',
    crystal: 'Bi pha lê',
    diy: 'Bộ DIY',    
    // Home specific
    productsTitle: 'Sản phẩm',
    b2bIntroTitle: 'Dịch vụ B2B của chúng tôi',
    b2bIntroText: 'BoboQ hoạt động độc quyền B2B với số lượng lớn. Chúng tôi cung cấp các sản phẩm Bubble Tea cao cấp và thiết bị cho các nhà hàng, quán cà phê và chuỗi bán lẻ. Liên hệ với chúng tôi để nhận báo giá tùy chỉnh và chiết khấu số lượng.',
    
    // Cart specific
    yourOrder: 'Đơn hàng của bạn',
    emptyCartMessage: 'Giỏ hàng trống.',
    totalAmount: 'Tổng số tiền',
    checkoutBtn: 'Thanh toán',
    requestQuote: 'Yêu cầu báo giá',
    checkoutSoon: 'Chức năng thanh toán sắp ra mắt!',
    quoteSent: 'Yêu cầu báo giá đã được gửi!',
    
    // Shop specific
    allCategory: 'Tất cả',
    
    // Product Card
    quantityLabel: 'Số lượng',
    
    // Product Names
    'erdbeer-boba': 'Boba Dâu',
    'heidelbeer-boba': 'Boba Việt quất',
    'kirsche-boba': 'Boba Anh đào',
    'kiwi-boba': 'Boba Kiwi',
    'litschi-boba': 'Boba Vải',
    'passionsfrucht-boba': 'Boba Chanh dây',
    'mango-boba': 'Boba Xoài',
    'schwarztee': 'Trà đen',
    'mango-sirup': 'Xi-rô Xoài',
    'erdbeer-sirup': 'Xi-rô Dâu',
    'braunerzucker-sirup': 'Xi-rô Đường nâu',
    'melone-sirup': 'Xi-rô Dưa',
    'passionsfrucht-sirup': 'Xi-rô Chanh dây',
    'pfirsisch-sirup': 'Xi-rô Đào',
    'strohhalm-set': 'Bộ ống hút',
    
    // FAQ Page
    faqQuestion1: 'Trà sữa là gì?',
    faqAnswer1: 'Trà sữa là một loại thức uống mát lạnh được tạo thành từ trà, sữa và những viên tapioca ăn được (boba).',
    faqQuestion2: 'Trà sữa được chuẩn bị như thế nào?',
    faqAnswer2: 'Trà được nấu, trộn với sữa hoặc siropit, và phục vụ với đá và các viên boba.',
    faqQuestion3: 'Bạn cung cấp những loại nào?',
    faqAnswer3: 'Chúng tôi cung cấp nhiều loại khác nhau với các kết hợp trà, trái cây và siropit.',
    faqQuestion4: 'Những thành phần có phải là thuần chay không?',
    faqAnswer4: 'Nhiều sản phẩm của chúng tôi có thể được chuẩn bị theo chế độ thuần chay. Vui lòng hỏi nhân viên.',
    faqQuestion5: 'Giao hàng mất bao lâu?',
    faqAnswer5: 'Giao hàng thường mất 2-3 ngày làm việc sau khi đặt hàng.',
    
    // Auth Pages
    login: 'Đăng nhập',
    register: 'Đăng ký',
    loginTitle: 'Đăng nhập',
    registerTitle: 'Đăng ký',
    firstName: 'Tên',
    lastName: 'Họ',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    signUp: 'Đăng ký',
    alreadyHaveAccount: 'Đã đăng ký? Đăng nhập tại đây',
    noAccount: 'Chưa có tài khoản? Đăng ký ngay',
    loggingIn: 'Đang đăng nhập...',
    signingUp: 'Đang đăng ký...',
    loginFailed: 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập của bạn.',
    registerFailed: 'Đăng ký thất bại. Vui lòng thử lại sau.',
    passwordMismatch: 'Mật khẩu không khớp',
    passwordTooShort: 'Mật khẩu phải dài ít nhất 6 ký tự',
    
    // Checkout Page
    shippingAddress: 'Địa chỉ giao hàng',
    registeredCustomer: 'Khách hàng đã đăng ký',
    registerToOrder: 'Đặt hàng bằng tài khoản BoboQ của bạn',
    guestCheckout: 'Đơn hàng khách',
    guestCheckoutDesc: 'Đặt hàng mà không cần tài khoản',
    selectCheckout: 'Đăng nhập',
    orderAsGuest: 'Đặt hàng như khách',
    street: 'Địa chỉ và số nhà',
    postalCode: 'Mã bưu chính',
    city: 'Thành phố',
    country: 'Quốc gia',
    orderSummary: 'Tóm tắt đơn hàng',
    subtotalLabel: 'Tạm tính',
    shippingCosts: 'Chi phí giao hàng',
    totalPrice: 'Tổng số tiền',
    placeOrder: 'Đặt hàng',
    processing: 'Đang xử lý...',
    orderSuccess: 'Đặt hàng thành công!',
    orderError: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
    fillAllFields: 'Vui lòng điền tất cả các trường',
    authOrGuest: 'Vui lòng đăng nhập hoặc đặt hàng như khách',
    requiredFields: 'Vui lòng điền tất cả các trường bắt buộc',
    back: '← Quay lại',
  },
  zh: {
    // Header
    home: '首页',
    products: '产品',
    contact: '联系',
    faq: '常见问题',
    search: '搜索...',
    cart: '购物车',
    articles: '件商品',
    
    // Cart Preview
    viewCart: '查看购物车',
    emptyCart: '购物车是空的',
    total: '总计',
    itemSum: '项目总计',
    signIn: '登录',
    logout: '登出',
    moreResults: '更多结果',
    noProductsFound: '未找到产品',
    // Home Page
    welcomeTitle: '欢迎来到 BoboQ',
    welcomeSubtitle: '探索我们美味的珍珠奶茶',
    shopNow: '立即购买',
    ourCategories: '我们的分类',
    featuredProducts: '畅销产品',
    addToCart: '加入购物车',
    added: '已添加',
    
    // Shop Page
    allProducts: '所有产品',
    filterByCategory: '按类别筛选',
    all: '全部',
    
    // Product Detail
    quantity: '数量',
    price: '价格',
    description: '描述',
    backToShop: '返回商店',
    detailNotFoundTitle: '未找到产品',
    detailNotFoundBody: '您要找的产品暂不可用。欢迎浏览商店中的其他商品。',
    detailBadge: '了解更多',
    detailLead: '以下是该产品的补充说明。我们注重优质原料、平衡的甜度，以及与奶茶和果茶完美搭配的浓郁风味。',
    detailHighlight1: '精选原料，新鲜制作',
    detailHighlight2: '适合与我们的茶叶和糖浆搭配',
    detailHighlight3: '快速冲调——即刻享用一杯泡泡茶',
    detailHighlight4: '想要更多创意？逛逛商店，搭配你的专属组合。',
    
    // Cart Page
    yourCart: '您的购物车',
    product: '产品',
    remove: '删除',
    subtotal: '小计',
    checkout: '结账',
    continueShopping: '继续购物',
    
    // Contact Page
    contactUs: '联系我们',
    email: '邮箱',
    phone: '电话',
    address: '地址',
    
    // FAQ Page
    frequentlyAsked: '常见问题',
    
    // Footer
    followUs: '关注我们',
    imprint: '版权信息',
    privacy: '隐私政策',
    
    // Categories
    boba: 'Boba',
    tapioka: '木薯',
    tee: '茶',
    sirup: '糖浆',
    zubehor: '配件',    pulver: '粉末',
    jelly: '果冻',
    jellyjuice: '爆汁果冻',
    crystal: '水晶球',
    diy: 'DIY套装',    
    // Home specific
    productsTitle: '产品',
    b2bIntroTitle: '我们的B2B服务',
    b2bIntroText: 'BoboQ 专门经营B2B大批量业务。我们为餐厅、咖啡厅和零售连锁店提供优质的珍珠奶茶产品和设备。联系我们获取定制报价和批量折扣。',
    
    // Cart specific
    yourOrder: '您的订单',
    emptyCartMessage: '购物车是空的。',
    totalAmount: '总金额',
    checkoutBtn: '结账',
    requestQuote: '请求报价',
    checkoutSoon: '结账功能即将推出！',
    quoteSent: '报价请求已发送！',
    
    // Shop specific
    allCategory: '全部',
    
    // Product Card
    quantityLabel: '数量',
    
    // Product Names
    'erdbeer-boba': '草莓波霸',
    'heidelbeer-boba': '蓝莓波霸',
    'kirsche-boba': '樱桃波霸',
    'kiwi-boba': '奇异果波霸',
    'litschi-boba': '荔枝波霸',
    'passionsfrucht-boba': '百香果波霸',
    'mango-boba': '芒果波霸',
    'schwarztee': '红茶',
    'mango-sirup': '芒果糖浆',
    'erdbeer-sirup': '草莓糖浆',
    'braunerzucker-sirup': '黑糖糖浆',
    'melone-sirup': '蜜瓜糖浆',
    'passionsfrucht-sirup': '百香果糖浆',
    'pfirsisch-sirup': '桃子糖浆',
    'strohhalm-set': '吸管套装',
    
    // FAQ Page
    faqQuestion1: '珍珠奶茶是什么?',
    faqAnswer1: '珍珠奶茶是一种台湾饮品，由茶、牛奶和食用木薯珍珠（波霸）组成。',
    faqQuestion2: '珍珠奶茶是如何制作的?',
    faqAnswer2: '茶被煮沸，与牛奶或糖浆混合，并与冰和波霸珍珠一起供应。',
    faqQuestion3: '你们提供哪些品种?',
    faqAnswer3: '我们提供许多不同的品种，具有不同的茶、水果和糖浆组合。',
    faqQuestion4: '成分是素食的吗?',
    faqAnswer4: '我们的许多产品可以制作成素食。请咨询我们的员工。',
    faqQuestion5: '运输需要多长时间?',
    faqAnswer5: '下单后通常需要2-3个工作日才能送达。',
    
    // Auth Pages
    login: '登录',
    register: '注册',
    loginTitle: '登录',
    registerTitle: '注册',
    firstName: '名字',
    lastName: '姓氏',
    password: '密码',
    confirmPassword: '确认密码',
    signUp: '注册',
    alreadyHaveAccount: '已注册? 在这里登录',
    noAccount: '还没有帐户? 立即注册',
    loggingIn: '登录中...',
    signingUp: '注册中...',
    loginFailed: '登录失败。请检查您的凭据。',
    registerFailed: '注册失败。请稍后重试。',
    passwordMismatch: '密码不匹配',
    passwordTooShort: '密码必须至少6个字符长',
    
    // Checkout Page
    shippingAddress: '收货地址',
    registeredCustomer: '注册客户',
    registerToOrder: '使用您的 BoboQ 帐户订购',
    guestCheckout: '客人订单',
    guestCheckoutDesc: '无需帐户即可订购',
    selectCheckout: '登录',
    orderAsGuest: '以客人身份订购',
    street: '街道和门牌号',
    postalCode: '邮政编码',
    city: '城市',
    country: '国家',
    orderSummary: '订单摘要',
    subtotalLabel: '小计',
    shippingCosts: '运费',
    totalPrice: '总金额',
    placeOrder: '确认订单',
    processing: '处理中...',
    orderSuccess: '订单成功！',
    orderError: '出错了。请稍后重试。',
    fillAllFields: '请填写所有字段',
    authOrGuest: '请登录或以客人身份订购',
    requiredFields: '请填写所有必填字段',
    back: '← 返回',
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  return (translations[lang] as any)[key] || (translations.de as any)[key] || key;
};
