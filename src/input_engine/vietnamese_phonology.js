export const VietnamesePhonology = {
    // 1. Nguyên âm đơn
    monophthongs: {
        a: ["a", "à", "á", "ả", "ã", "ạ"],
        ă: ["ă", "ằ", "ắ", "ẳ", "ẵ", "ặ"],
        â: ["â", "ầ", "ấ", "ẩ", "ẫ", "ậ"],
        e: ["e", "è", "é", "ẻ", "ẽ", "ẹ"],
        ê: ["ê", "ề", "ế", "ể", "ễ", "ệ"],
        i: ["i", "ì", "í", "ỉ", "ĩ", "ị"],
        o: ["o", "ò", "ó", "ỏ", "õ", "ọ"],
        ô: ["ô", "ồ", "ố", "ổ", "ỗ", "ộ"],
        ơ: ["ơ", "ờ", "ớ", "ở", "ỡ", "ợ"],
        u: ["u", "ù", "ú", "ủ", "ũ", "ụ"],
        ư: ["ư", "ừ", "ứ", "ử", "ữ", "ự"],
        y: ["y", "ỳ", "ý", "ỷ", "ỹ", "ỵ"]
    },

    // 2. Nguyên âm đôi
    diphthongs: {
        openSyllables: {
            ia: ["ia", "ìa", "ía", "ỉa", "ĩa", "ịa"],
            ua: ["ua", "ùa", "úa", "ủa", "ũa", "ụa"],
            ưa: ["ưa", "ừa", "ứa", "ửa", "ữa", "ựa"]
        },
        closedSyllables: {
            iê: ["iê", "iề", "iế", "iể", "iễ", "iệ"],
            uô: ["uô", "uồ", "uố", "uổ", "uỗ", "uộ"],
            ươ: ["ươ", "ườ", "ướ", "ưở", "ưỡ", "ượ"],
            yê: ["yê", "yề", "yế", "yể", "yễ", "yệ"]
        }
    },

    // 3. Tổ hợp phức
    complexVowels: {
        medialClusters: {
            oa: ["oa", "oà", "oá", "oả", "oã", "oạ"],
            oe: ["oe", "oè", "oé", "oẻ", "oẽ", "oẹ"],
            uê: ["uê", "uề", "uế", "uể", "uễ", "uệ"],
            uơ: ["uơ", "uờ", "uớ", "uở", "uỡ", "uợ"],
            uy: ["uy", "uỳ", "uý", "uỷ", "uỹ", "uỵ"]
        },
        tripleVowels: {
            uyê: ["uyê", "uyề", "uyế", "uyể", "uyễ", "uyệ"],
            uôi: ["uôi", "uồi", "uối", "uổi", "uỗi", "uội"],
            ươi: ["ươi", "ười", "ưới", "ưởi", "ưỡi", "ượi"],
            ươu: ["ươu", "ườu", "ướu", "ưởu", "ưỡu", "ượu"],
            oai: ["oai", "oài", "oái", "oải", "oãi", "oại"],
            oay: ["oay", "oày", "oáy", "oảy", "oãy", "oạy"],
            uyu: ["uyu", "uỳu", "uýu", "uỷu", "uỹu", "uỵu"]
        }
    },

    // 4. Phụ âm đầu
    initials: {
        single: ["b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x"],
        cluster: ["ch", "gh", "gi", "kh", "ng", "ngh", "nh", "ph", "th", "tr", "qu"]
    },

    // 5. Âm cuối
    finals: {
        consonants: ["p", "t", "c", "ch", "m", "n", "ng", "nh"],
        vowelEndings: ["i", "y", "u", "o"],
        specialCases: ["oc", "ooc", "oong"]
    },

    // 6. Trường hợp đặc biệt
    specialRules: {
        giICombination: ["gi", "gì", "gí", "gỉ", "gĩ", "gị"],
        quRule: {
            description: "Tone mark placed after 'qu'",
            examples: ["quả", "quýt", "quỵ"]
        }
    },

    // 7. Dấu thanh
    tones: {
        ngang: "",
        huyen: "\u0300",
        sac: "\u0301",
        hoi: "\u0309",
        nga: "\u0303",
        nang: "\u0323"
    }
};