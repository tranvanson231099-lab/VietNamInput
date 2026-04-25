/**
 * VIETNAMESE VOWEL & SPECIAL MAP - COMPLETE VERSION
 * Author: Sơn
 * Cấu trúc: [Gốc]: [{ telex, char, uni }]
 */

export const VietnameseVowelMap = {
    // --- 1. NGUYÊN ÂM ĐƠN (Monophthongs) ---
    "a": [
        { telex: "a", char: "a", uni: "\u0061" }, { telex: "af", char: "à", uni: "\u00E0" },
        { telex: "as", char: "á", uni: "\u00E1" }, { telex: "ar", char: "ả", uni: "\u1EA3" },
        { telex: "ax", char: "ã", uni: "\u00E3" }, { telex: "aj", char: "ạ", uni: "\u1EA1" }
    ],
    "aw": [ // ă
        { telex: "aw", char: "ă", uni: "\u0103" }, { telex: "awf", char: "ằ", uni: "\u1EB1" },
        { telex: "aws", char: "ắ", uni: "\u1EAF" }, { telex: "awr", char: "ẳ", uni: "\u1EB3" },
        { telex: "awx", char: "ẵ", uni: "\u1EB5" }, { telex: "awj", char: "ặ", uni: "\u1EB7" }
    ],
    "aa": [ // â
        { telex: "aa", char: "â", uni: "\u00E2" }, { telex: "aaf", char: "ầ", uni: "\u1EA7" },
        { telex: "aas", char: "ấ", uni: "\u1EA5" }, { telex: "aar", char: "ẩ", uni: "\u1EA9" },
        { telex: "aax", char: "ẫ", uni: "\u1EAB" }, { telex: "aaj", char: "ậ", uni: "\u1EAD" }
    ],
    "e": [
        { telex: "e", char: "e", uni: "\u0065" }, { telex: "ef", char: "è", uni: "\u00E8" },
        { telex: "es", char: "é", uni: "\u00E9" }, { telex: "er", char: "ẻ", uni: "\u1EBB" },
        { telex: "ex", char: "ẽ", uni: "\u1EBD" }, { telex: "ej", char: "ẹ", uni: "\u1EB9" }
    ],
    "ee": [ // ê
        { telex: "ee", char: "ê", uni: "\u00EA" }, { telex: "eef", char: "ề", uni: "\u1EC1" },
        { telex: "ees", char: "ế", uni: "\u1EBF" }, { telex: "eer", char: "ể", uni: "\u1EC3" },
        { telex: "eex", char: "ễ", uni: "\u1EC5" }, { telex: "eej", char: "ệ", uni: "\u1EC7" }
    ],
    "i": [
        { telex: "i", char: "i", uni: "\u0069" }, { telex: "if", char: "ì", uni: "\u00EC" },
        { telex: "is", char: "í", uni: "\u00ED" }, { telex: "ir", char: "ỉ", uni: "\u1EC9" },
        { telex: "ix", char: "ĩ", uni: "\u0129" }, { telex: "ij", char: "ị", uni: "\u1ECB" }
    ],
    "o": [
        { telex: "o", char: "o", uni: "\u006F" }, { telex: "of", char: "ò", uni: "\u00F2" },
        { telex: "os", char: "ó", uni: "\u00F3" }, { telex: "or", char: "ỏ", uni: "\u1ECF" },
        { telex: "ox", char: "õ", uni: "\u00F5" }, { telex: "oj", char: "ọ", uni: "\u1ECD" }
    ],
    "oo": [ // ô
        { telex: "oo", char: "ô", uni: "\u00F4" }, { telex: "oof", char: "ồ", uni: "\u1ED3" },
        { telex: "oos", char: "ố", uni: "\u1ED1" }, { telex: "oor", char: "ổ", uni: "\u1ED5" },
        { telex: "oox", char: "ỗ", uni: "\u1ED7" }, { telex: "ooj", char: "ộ", uni: "\u1ED9" }
    ],
    "ow": [ // ơ
        { telex: "ow", char: "ơ", uni: "\u01A1" }, { telex: "owf", char: "ờ", uni: "\u1EDD" },
        { telex: "ows", char: "ớ", uni: "\u1EDB" }, { telex: "owr", char: "ở", uni: "\u1EDF" },
        { telex: "owx", char: "ỡ", uni: "\u1EE1" }, { telex: "owj", char: "ợ", uni: "\u1EE3" }
    ],
    "u": [
        { telex: "u", char: "u", uni: "\u0075" }, { telex: "uf", char: "ù", uni: "\u00F9" },
        { telex: "us", char: "ú", uni: "\u00FA" }, { telex: "ur", char: "ủ", uni: "\u1EE7" },
        { telex: "ux", char: "ũ", uni: "\u0169" }, { telex: "uj", char: "ụ", uni: "\u1EE5" }
    ],
    "uw": [ // ư
        { telex: "uw", char: "ư", uni: "\u01B0" }, { telex: "uwf", char: "ừ", uni: "\u1EEB" },
        { telex: "uws", char: "ứ", uni: "\u1EE9" }, { telex: "uwr", char: "ử", uni: "\u1EED" },
        { telex: "uwx", char: "ữ", uni: "\u1EEF" }, { telex: "uwj", char: "ự", uni: "\u1EF1" }
    ],
    "y": [
        { telex: "y", char: "y", uni: "\u0079" }, { telex: "yf", char: "ỳ", uni: "\u1EF3" },
        { telex: "ys", char: "ý", uni: "\u00FD" }, { telex: "yr", char: "ỷ", uni: "\u1EF7" },
        { telex: "yx", char: "ỹ", uni: "\u1EF9" }, { telex: "yj", char: "ỵ", uni: "\u1EF5" }
    ],

    // --- 2. NGUYÊN ÂM ĐÔI (Diphthongs - Open & Closed) ---
    "ia": [ { telex: "ia", char: "ia", uni: "ia" }, { telex: "iaf", char: "ìa", uni: "\u00ECa" }, { telex: "ias", char: "ía", uni: "\u00EDa" }, { telex: "iar", char: "ỉa", uni: "\u1EC9a" }, { telex: "iax", char: "ĩa", uni: "\u0129a" }, { telex: "iaj", char: "ịa", uni: "\u1ECBa" } ],
    "ua": [ { telex: "ua", char: "ua", uni: "ua" }, { telex: "uaf", char: "ùa", uni: "\u00F9a" }, { telex: "uas", char: "úa", uni: "\u00FAa" }, { telex: "uar", char: "ủa", uni: "\u1EE7a" }, { telex: "uax", char: "ũa", uni: "\u0169a" }, { telex: "uaj", char: "ụa", uni: "\u1EE5a" } ],
    "ưa": [ { telex: "ưa", char: "ưa", uni: "\u01B0a" }, { telex: "ưaf", char: "ừa", uni: "\u1EEBa" }, { telex: "ưas", char: "ứa", uni: "\u1EE9a" }, { telex: "ưar", char: "ửa", uni: "\u1EEDa" }, { telex: "ưax", char: "ữạ", uni: "\u1EEFa" }, { telex: "ưaj", char: "ựạ", uni: "\u1EF1a" } ],
    "iê": [ { telex: "iê", char: "iê", uni: "i\u00EA" }, { telex: "iêf", char: "iề", uni: "i\u1EC1" }, { telex: "iês", char: "iế", uni: "i\u1EBF" }, { telex: "iêr", char: "iể", uni: "i\u1EC3" }, { telex: "iêx", char: "iễ", uni: "i\u1EC5" }, { telex: "iêj", char: "iệ", uni: "i\u1EC7" } ],
    "uô": [ { telex: "uô", char: "uô", uni: "u\u00F4" }, { telex: "uôf", char: "uồ", uni: "u\u1ED3" }, { telex: "uôs", char: "uố", uni: "u\u1ED1" }, { telex: "uôr", char: "uổ", uni: "u\u1ED5" }, { telex: "uôx", char: "uỗ", uni: "u\u1ED7" }, { telex: "uôj", char: "uộ", uni: "u\u1ED9" } ],
    "ươ": [ { telex: "ươ", char: "ươ", uni: "\u01B0\u01A1" }, { telex: "ươf", char: "ườ", uni: "\u01B0\u1EDD" }, { telex: "ươs", char: "ướ", uni: "\u01B0\u1EDB" }, { telex: "ươr", char: "ưở", uni: "\u01B0\u1EDF" }, { telex: "ươx", char: "ưỡ", uni: "\u01B0\u1EE1" }, { telex: "ươj", char: "ượ", uni: "\u01B0\u1EE3" } ],
    "yê": [ { telex: "yê", char: "yê", uni: "y\u00EA" }, { telex: "yêf", char: "yề", uni: "y\u1EC1" }, { telex: "yês", char: "yế", uni: "y\u1EBF" }, { telex: "yêr", char: "yể", uni: "y\u1EC3" }, { telex: "yêx", char: "yễ", uni: "y\u1EC5" }, { telex: "yêj", char: "yệ", uni: "y\u1EC7" } ],

    // --- 3. TỔ HỢP PHỨC (Medial Clusters & Triple Vowels) ---
    "oa": [ { telex: "oa", char: "oa", uni: "oa" }, { telex: "oaf", char: "oà", uni: "o\u00E0" }, { telex: "oas", char: "oá", uni: "o\u00E1" }, { telex: "oar", char: "oả", uni: "o\u1EA3" }, { telex: "oax", char: "oã", uni: "o\u00E3" }, { telex: "oaj", char: "oạ", uni: "o\u1EA1" } ],
    "oe": [ { telex: "oe", char: "oe", uni: "oe" }, { telex: "oef", char: "oè", uni: "o\u00E8" }, { telex: "oes", char: "oé", uni: "o\u00E9" }, { telex: "oer", char: "oẻ", uni: "o\u1EBB" }, { telex: "oex", char: "oẽ", uni: "o\u1EBD" }, { telex: "oej", char: "oẹ", uni: "o\u1EB9" } ],
    "uê": [ { telex: "uê", char: "uê", uni: "u\u00EA" }, { telex: "uêf", char: "uề", uni: "u\u1EC1" }, { telex: "uês", char: "uế", uni: "u\u1EBF" }, { telex: "uêr", char: "uể", uni: "u\u1EC3" }, { telex: "uêx", char: "uễ", uni: "u\u1EC5" }, { telex: "uêj", char: "uệ", uni: "u\u1EC7" } ],
    "uơ": [ { telex: "uơ", char: "uơ", uni: "u\u01A1" }, { telex: "uơf", char: "uờ", uni: "u\u1EDD" }, { telex: "uơs", char: "uớ", uni: "u\u1EDB" }, { telex: "uơr", char: "uở", uni: "u\u1EDF" }, { telex: "uơx", char: "uỡ", uni: "u\u1EE1" }, { telex: "uơj", char: "uợ", uni: "u\u1EE3" } ],
    "uy": [ { telex: "uy", char: "uy", uni: "uy" }, { telex: "uyf", char: "uỳ", uni: "u\u1EF3" }, { telex: "uys", char: "uý", uni: "u\u00FD" }, { telex: "uyr", char: "uỷ", uni: "u\u1EF7" }, { telex: "uyx", char: "uỹ", uni: "u\u1EF9" }, { telex: "uyj", char: "uỵ", uni: "u\u1EF5" } ],
    "uyê": [ { telex: "uyê", char: "uyê", uni: "uy\u00EA" }, { telex: "uyêf", char: "uyề", uni: "uy\u1EC1" }, { telex: "uyês", char: "uyế", uni: "uy\u1EBF" }, { telex: "uyêr", char: "uyể", uni: "uy\u1EC3" }, { telex: "uyêx", char: "uyễ", uni: "uy\u1EC5" }, { telex: "uyêj", char: "uyệ", uni: "uy\u1EC7" } ],
    "uôi": [ { telex: "uôi", char: "uôi", uni: "u\u00F4i" }, { telex: "uôif", char: "uồi", uni: "u\u1ED3i" }, { telex: "uôis", char: "uối", uni: "u\u1ED1i" }, { telex: "uôir", char: "uổi", uni: "u\u1ED5i" }, { telex: "uôix", char: "uỗi", uni: "u\u1ED7i" }, { telex: "uôij", char: "uội", uni: "u\u1ED9i" } ],
    "ươi": [ { telex: "ươi", char: "ươi", uni: "\u01B0\u01A1i" }, { telex: "ươif", char: "ười", uni: "\u01B0\u1EDDi" }, { telex: "ươis", char: "ưới", uni: "\u01B0\u1EDBi" }, { telex: "ươir", char: "ưởi", uni: "\u01B0\u1EDFi" }, { telex: "ươix", char: "ưỡi", uni: "\u01B0\u1EE1i" }, { telex: "ươij", char: "ượi", uni: "\u01B0\u1EE3i" } ],
    "ươu": [ { telex: "ươu", char: "ươu", uni: "\u01B0\u01A1u" }, { telex: "ươuf", char: "ườu", uni: "\u01B0\u1EDDu" }, { telex: "ươus", char: "ướu", uni: "\u01B0\u1EDBu" }, { telex: "ươur", char: "ưởu", uni: "\u01B0\u1EDFu" }, { telex: "ươux", char: "ưỡu", uni: "\u01B0\u1EE1u" }, { telex: "ươuj", char: "ượu", uni: "\u01B0\u1EE3u" } ],
    "oai": [ { telex: "oai", char: "oai", uni: "oai" }, { telex: "oaif", char: "oài", uni: "o\u00E0i" }, { telex: "oais", char: "oái", uni: "o\u00E1i" }, { telex: "oair", char: "oải", uni: "o\u1EA3i" }, { telex: "oaix", char: "oãi", uni: "o\u00E3i" }, { telex: "oaij", char: "oại", uni: "o\u1EA1i" } ],
    "oay": [ { telex: "oay", char: "oay", uni: "oay" }, { telex: "oayf", char: "oày", uni: "o\u00E0y" }, { telex: "oays", char: "oáy", uni: "o\u00E1y" }, { telex: "oayr", char: "oảy", uni: "o\u1EA3y" }, { telex: "oayx", char: "oãy", uni: "o\u00E3y" }, { telex: "oayj", char: "oạy", uni: "o\u1EA1y" } ],
    "uyu": [ { telex: "uyu", char: "uyu", uni: "uyu" }, { telex: "uyuf", char: "uỳu", uni: "u\u1EF3u" }, { telex: "uyus", char: "uýu", uni: "u\u00FDu" }, { telex: "uyur", char: "uỷu", uni: "u\u1EF7u" }, { telex: "uyux", char: "uỹu", uni: "u\u1EF9u" }, { telex: "uyuj", char: "uỵu", uni: "u\u1EF5u" } ],

    // // --- 4. TRƯỜNG HỢP ĐẶC BIỆT (Special Rules) ---
    // "gi_i": [
    //     { telex: "gi", char: "gi", uni: "gi" }, { telex: "gif", char: "gì", uni: "g\u00EC" },
    //     { telex: "gis", char: "gí", uni: "g\u00ED" }, { telex: "gir", char: "gỉ", uni: "g\u1EC9" },
    //     { telex: "gix", char: "gĩ", uni: "g\u0129" }, { telex: "gij", char: "gị", uni: "g\u1ECB" }
    // ],
    "dd": [{ telex: "dd", char: "đ", uni: "\u0111" }]
};

// export const ToneMap = { "z": 0, "f": 1, "s": 2, "r": 3, "x": 4, "j": 5 };