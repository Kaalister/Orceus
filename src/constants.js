export const paramsParticles = {
    "particles":{
        "number":{
            "value":130,
            "density":{
                "enable":true,
                "value_area":800
            }
        },
        "color":{
            "value":"#f7dd5c"
        },
        "shape":{
            "type":"circle",
            "stroke":{
                "width":0,
                "color":"#000000"
            },
            "polygon":{
                "nb_sides":5
            },
            "image":{
                "src":"img/github.svg",
                "width":100,
                "height":100
            }
        },
        "opacity":{
            "value": 0.3,
            "random":true,
            "anim":{
                "enable":true,
                "speed":0.2,
                "opacity_min":0.1,
                "sync":false
            }
        },
        "size":{
            "value":5,
            "random":true,
            "anim":{
                "enable":true,
                "speed":0.4,
                "size_min":0.1,
                "sync":false
            }
        },
        "line_linked":{
            "enable":true,
            "distance":100,
            "color":"#f7dd5c",
            "opacity":0.4,
            "width":2
        },
        "move":{
            "enable":true,
            "speed":0.3,
            "direction":"none",
            "random":false,
            "straight":false,
            "out_mode":"out",
            "bounce":false,
            "attract":{
                "enable":false,
                "rotateX":600,
                "rotateY":1200
            }
        }
    },
    "interactivity":{
        "detect_on":"canvas",
        "events":{
            "onhover":{
                "enable":false,
                "mode":"bubble"
            },
            "onclick":{
                "enable":false,
                "mode":"repulse"
            },
            "resize":false
        },
        "modes":{
            "grab":{
                "distance":400,
                "line_linked":{
                "opacity":0.5
                }
            },
            "bubble":{
                "distance":400,
                "size":4,
                "duration":0.3,
                "opacity":1,
                "speed":3
            },
            "repulse":{
                "distance":200,
                "duration":0.4
            },
            "push":{
                "particles_nb":4
            },
            "remove":{
                "particles_nb":2
            }
        }
    },
    "retina_detect":true
}

export const PLANTS_ABYSS = [{
    name: "Spore de Crisse",
    stage: -1,
    max: 70,
    min: 60,
}, {
    name: "Feuille de Crisse",
    stage: -1,
    max: 59,
    min: 50,
}, {
    name: "Filament du néant",
    stage: -1,
    max: 49,
    min: 40,
}, {
    name: "Œil de nathy",
    stage: -1,
    max: 39,
    min: 30,
}, {
    name: "Lumineur",
    stage: -1,
    max: 29,
    min: 26,
}, {
    name: "Ptelea",
    stage: -1,
    max: 25,
    min: 16,
}, {
    name: "Cardus",
    stage: -1,
    max: 15,
    min: 10,
}, {
    name: "Solanum",
    stage: -1,
    max: 9,
    min: 6,
}, {
    name: "Ranun",
    stage: -1,
    max: 5,
    min: 1,
}, {
    name: "Champignon poche",
    stage: -2,
    max: 70,
    min: 60,
}, {
    name: "Œil de nathy",
    stage: -2,
    max: 59,
    min: 45,
}, {
    name: "Fleur d'hurleur",
    stage: -2,
    max: 44,
    min: 35,
}, {
    name: "Main de griffue",
    stage: -2,
    max: 34,
    min: 26,
}, {
    name: "Bracyka",
    stage: -2,
    max: 25,
    min: 16,
}, {
    name: "Vulua",
    stage: -2,
    max: 15,
    min: 10,
}, {
    name: "Amaredia",
    stage: -2,
    max: 9,
    min: 7,
}, {
    name: "Antryll",
    stage: -2,
    max: 6,
    min: 1,
}, {
    name: "Champignon phosphorescent",
    stage: -3,
    max: 70,
    min: 55,
}, {
    name: "Œil de nathy",
    stage: -3,
    max: 54,
    min: 45,
}, {
    name: "Buisson piquant",
    stage: -3,
    max: 44,
    min: 37,
}, {
    name: "Feuilles des Songes",
    stage: -3,
    max: 36,
    min: 30,
}, {
    name: "Larmes de Pierre",
    stage: -3,
    max: 29,
    min: 25,
}, {
    name: "Vyvitis",
    stage: -3,
    max: 24,
    min: 16,
}, {
    name: "Kiono",
    stage: -3,
    max: 15,
    min: 10,
}, {
    name: "Calypso",
    stage: -3,
    max: 9,
    min: 5,
}, {
    name: "Phor",
    stage: -3,
    max: 4,
    min: 1,
}, {
    name: "Œil de nathy",
    stage: -4,
    max: 60,
    min: 45,
}, {
    name: "Itea",
    stage: -4,
    max: 44,
    min: 40,
}, {
    name: "Zante",
    stage: -4,
    max: 39,
    min: 35,
}, {
    name: "Cydenia",
    stage: -4,
    max: 34,
    min: 30,
}, {
    name: "Pteros",
    stage: -4,
    max: 29,
    min: 25,
}, {
    name: "Morae",
    stage: -4,
    max: 24,
    min: 20,
}, {
    name: "Larix",
    stage: -4,
    max: 19,
    min: 13,
}, {
    name: "Coeur des anges",
    stage: -4,
    max: 12,
    min: 9,
}, {
    name: "Sphilyé",
    stage: -4,
    max: 8,
    min: 8,
}, {
    name: "Polychroma",
    stage: -4,
    max: 7,
    min: 3,
}, {
    name: "Onea",
    stage: -4,
    max: 2,
    min: 1,
}, {
    name: "Œil de nathy",
    stage: -5,
    max: 65,
    min: 55,
}, {
    name: "Miroir de lune",
    stage: -5,
    max: 54,
    min: 47,
}, {
    name: "Cendre des bannis",
    stage: -5,
    max: 46,
    min: 35,
}, {
    name: "Kotynuce",
    stage: -5,
    max: 34,
    min: 30,
}, {
    name: "Qalapy",
    stage: -5,
    max: 29,
    min: 25,
}, {
    name: "Ramulus",
    stage: -5,
    max: 24,
    min: 18,
}, {
    name: "Eopha",
    stage: -5,
    max: 17,
    min: 13,
}, {
    name: "Tiphonya",
    stage: -5,
    max: 12,
    min: 9,
}, {
    name: "Cosmos",
    stage: -5,
    max: 8,
    min: 6,
}, {
    name: "Yxif",
    stage: -5,
    max: 5,
    min: 2,
}, {
    name: "Etana",
    stage: -5,
    max: 1,
    min: 1,
}, ];

export const ROCKS_ABYSS = [{
    name: "Sicium",
    stage: -1,
    min: 60,
    max: 90,
    in: [],
    notIn: [],
}, {
    name: "Étoile de dentelle",
    stage: -1,
    min: 40,
    max: 49,
    in: [],
    notIn: [],
}, {
    name: "Kolium",
    stage: -1,
    min: 50,
    max: 59,
    in: [],
    notIn: [],
}, {
    name: "Fricium",
    stage: -1,
    min: 30,
    max: 39,
    in: [],
    notIn: [],
}, {
    name: "Corne de cristal",
    stage: -1,
    min: 25,
    max: 29,
    in: [],
    notIn: [],
}, {
    name: "Raone",
    stage: -1,
    min: 15,
    max: 19,
    in: [],
    notIn: [],
}, {
    name: "Vadion",
    stage: -1,
    min: 10,
    max: 14,
    in: [],
    notIn: [],
}, {
    name: "Scenarite",
    stage: -1,
    min: 6,
    max: 9,
    in: [],
    notIn: [],
}, {
    name: "Orite",
    stage: -1,
    min: 20,
    max: 24,
    in: [],
    notIn: [],
}, {
    name: "Relique Carre",
    stage: -1,
    min: 1,
    max: 5,
    in: [],
    notIn: [],
}, {
    name: "Neledium",
    stage: -2,
    min: 60,
    max: 90,
    in: [],
    notIn: [],
}, {
    name: "Chrosite",
    stage: -2,
    min: 50,
    max: 59,
    in: [],
    notIn: [],
}, {
    name: "Gayaïte",
    stage: -2,
    min: 40,
    max: 49,
    in: [],
    notIn: [],
}, {
    name: "Villtium",
    stage: -2,
    min: 30,
    max: 39,
    in: [],
    notIn: [],
}, {
    name: "Absicate",
    stage: -2,
    min: 25,
    max: 29,
    in: [],
    notIn: [],
}, {
    name: "Gopsol",
    stage: -2,
    min: 20,
    max: 24,
    in: [],
    notIn: [],
}, {
    name: "Syniom",
    stage: -2,
    min: 10,
    max: 19,
    in: [],
    notIn: [],
}, {
    name: "Elaelite",
    stage: -2,
    min: 6,
    max: 9,
    in: [],
    notIn: [],
}, {
    name: "Relique sphere",
    stage: -2,
    min: 1,
    max: 5,
    in: [],
    notIn: [],
}, {
    name: "Alboze",
    stage: -3,
    min: 60,
    max: 75,
    in: [],
    notIn: [],
}, {
    name: "Aparyum",
    stage: -3,
    min: 45,
    max: 59,
    in: [],
    notIn: [],
}, {
    name: "Tinspare",
    stage: -3,
    min: 35,
    max: 44,
    in: [],
    notIn: [],
}, {
    name: "Siguiom",
    stage: -3,
    min: 25,
    max: 34,
    in: [],
    notIn: [],
}, {
    name: "Prasite",
    stage: -3,
    min: 20,
    max: 24,
    in: [],
    notIn: [],
}, {
    name: "Taemyte",
    stage: -3,
    min: 15,
    max: 19,
    in: [],
    notIn: [],
}, {
    name: "Haeliste",
    stage: -3,
    min: 10,
    max: 14,
    in: [],
    notIn: [],
}, {
    name: "Eatryll",
    stage: -3,
    min: 8,
    max: 9,
    in: [],
    notIn: [],
}, {
    name: "Asporate",
    stage: -3,
    min: 6,
    max: 7,
    in: [],
    notIn: [],
}, {
    name: "Helaryte",
    stage: -3,
    min: 1,
    max: 1,
    in: [],
    notIn: [],
}, {
    name: "Relique losange",
    stage: -3,
    min: 2,
    max: 5,
    in: [],
    notIn: [],
}, {
    name: "Saothite",
    stage: -4,
    min: 60,
    max: 65,
    in: [],
    notIn: [],
}, {
    name: "Inimite",
    stage: -4,
    min: 55,
    max: 59,
    in: [],
    notIn: [],
}, {
    name: "Gybrom",
    stage: -4,
    min: 50,
    max: 54,
    in: [],
    notIn: [],
}, {
    name: "Châtaigne de bronze",
    stage: -4,
    min: 45,
    max: 49,
    in: [],
    notIn: [],
}, {
    name: "Thenpolithe",
    stage: -4,
    min: 40,
    max: 44,
    in: [],
    notIn: [],
}, {
    name: "Iokelom", //milieu chaud
    stage: -4,
    min: 35,
    max: 39,
    in: ['hot'],
    notIn: [],
}, {
    name: "Diahite", //milieu chaud
    stage: -4,
    min: 30,
    max: 34,
    in: ['hot'],
    notIn: [],
}, {
    name: "Miarcyte", //milieu non chaud
    stage: -4,
    min: 26,
    max: 29,
    in: [],
    notIn: ['hot'],
}, {
    name: "Freej", //milieu chaud
    stage: -4,
    min: 26,
    max: 29,
    in: ['hot'],
    notIn: [],
}, {
    name: "Sukium", //milieu chaud
    stage: -4,
    min: 20,
    max: 25,
    in: ['hot'],
    notIn: [],
}, {
    name: "Chloaryte", //milieu non chaud
    stage: -4,
    min: 14,
    max: 19,
    in: [],
    notIn: ['hot'],
}, {
    name: "Mibhy", // milieu chaud
    stage: -4,
    min: 14,
    max: 19,
    in: ['hot'],
    notIn: [],
}, {
    name: "Vialithe",
    stage: -4,
    min: 10,
    max: 13,
    in: [],
    notIn: [],
}, {
    name: "Abhakyte",
    stage: -4,
    min: 8,
    max: 9,
    in: [],
    notIn: [],
}, {
    name: "Tusiro",
    stage: -4,
    min: 5,
    max: 7,
    in: [],
    notIn: [],
}, {
    name: "Relique rectangulaire",
    stage: -4,
    min: 1,
    max: 4,
    in: [],
    notIn: [],
}, {
    name: "Exelyte",
    stage: -5,
    min: 40,
    max: 50,
    in: [],
    notIn: [],
}, {
    name: "Moonum",
    stage: -5,
    min: 40,
    max: 44,
    in: [],
    notIn: [],
}, {
    name: "Terkyum",
    stage: -5,
    min: 35,
    max: 39,
    in: [],
    notIn: [],
}, {
    name: "Melyte",
    stage: -5,
    min: 30,
    max: 34,
    in: [],
    notIn: [],
}, {
    name: "Anecyte",
    stage: -5,
    min: 25,
    max: 29,
    in: [],
    notIn: [],
}, {
    name: "Zylium",
    stage: -5,
    min: 20,
    max: 24,
    in: [],
    notIn: [],
}, {
    name: "Sydenium",
    stage: -5,
    min: 15,
    max: 19,
    in: [],
    notIn: [],
}, {
    name: "Loroïte",
    stage: -5,
    min: 10,
    max: 14,
    in: [],
    notIn: [],
}, {
    name: "Actase",
    stage: -5,
    min: 5,
    max: 9,
    in: [],
    notIn: [],
}, {
    name: "Alafyte",
    stage: -5,
    min: 3,
    max: 4,
    in: [],
    notIn: [],
}, {
    name: "Aksuth",
    stage: -5,
    min: 1,
    max: 2,
    in: [],
    notIn: [],
}, {
    name: "Hesium",
    stage: -6,
    min: 61,
    max: 65,
    in: [],
    notIn: [],
}, {
    name: "Ludicote",
    stage: -6,
    min: 57,
    max: 60,
    in: [],
    notIn: [],
}, {
    name: "Sanirium",
    stage: -6,
    min: 53,
    max: 56,
    in: [],
    notIn: [],
}, {
    name: "Weddlet",
    stage: -6,
    min: 48,
    max: 52,
    in: [],
    notIn: [],
}, {
    name: "Quirior",
    stage: -6,
    min: 44,
    max: 47,
    in: [],
    notIn: [],
}, {
    name: "Chardakrite",
    stage: -6,
    min: 41,
    max: 43,
    in: [],
    notIn: [],
}, {
    name: "Cyate",
    stage: -6,
    min: 36,
    max: 40,
    in: [],
    notIn: [],
}, {
    name: "Oxyphyte",
    stage: -6,
    min: 33,
    max: 35,
    in: [],
    notIn: [],
}, {
    name: "Ninium",
    stage: -6,
    min: 28,
    max: 32,
    in: [],
    notIn: [],
}, {
    name: "Buknarium",
    stage: -6,
    min: 24,
    max: 27,
    in: [],
    notIn: [],
}, {
    name: "Rhodkra",
    stage: -6,
    min: 18,
    max: 23,
    in: [],
    notIn: [],
}, {
    name: "Thenxythe",
    stage: -6,
    min: 14,
    max: 17,
    in: [],
    notIn: [],
}, {
    name: "Waryah",
    stage: -6,
    min: 11,
    max: 13,
    in: [],
    notIn: [],
}, {
    name: "Spium",
    stage: -6,
    min: 8,
    max: 10,
    in: [],
    notIn: [],
}, {
    name: "Xemlyne",
    stage: -6,
    min: 4,
    max: 7,
    in: [],
    notIn: [],
}, {
    name: "Yxoth",
    stage: -6,
    min: 1,
    max: 3,
    in: [],
    notIn: [],
}, {
    name: "Anaphite",
    stage: -7,
    min: 28,
    max: 30,
    in: [],
    notIn: [],
}, {
    name: "Natrahyte",
    stage: -7,
    min: 25,
    max: 27,
    in: [],
    notIn: [],
}, {
    name: "Etlanythe",
    stage: -7,
    min: 22,
    max: 24,
    in: [],
    notIn: [],
}, {
    name: "Kogyum",
    stage: -7,
    min: 19,
    max: 21,
    in: [],
    notIn: [],
}, {
    name: "Zymose",
    stage: -7,
    min: 16,
    max: 18,
    in: [],
    notIn: [],
}, {
    name: "Ekaole",
    stage: -7,
    min: 14,
    max: 15,
    in: [],
    notIn: [],
}, {
    name: "Lublyte",
    stage: -7,
    min: 11,
    max: 13,
    in: [],
    notIn: [],
}, {
    name: "Stualium",
    stage: -7,
    min: 8,
    max: 10,
    in: [],
    notIn: [],
}, {
    name: "Uralype",
    stage: -7,
    min: 5,
    max: 7,
    in: [],
    notIn: [],
}, {
    name: "Genuth",
    stage: -7,
    min: 2,
    max: 4,
    in: [],
    notIn: [],
}, {
    name: "Zakrotone",
    stage: -7,
    min: 1,
    max: 1,
    in: [],
    notIn: [],
}, ];