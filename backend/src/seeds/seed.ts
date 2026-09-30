import "reflect-metadata";
import { AppDataSource } from "../config/data-source";

import { Game } from "../models/Games";
import { Story } from "../models/Story";
import { StoryPage } from "../models/StoryPage";
import { GameHistory } from "../models/GameHistory";
import { Accessory } from "../models/Accessories";

async function seed() {
    try {
        await AppDataSource.initialize();

        console.log("Banco conectado.");
        console.log("Iniciando seed...\n");

        const gameRepository = AppDataSource.getRepository(Game);
        const gameHistoryRepository = AppDataSource.getRepository(GameHistory);
        const storyRepository = AppDataSource.getRepository(Story);
        const storyPageRepository = AppDataSource.getRepository(StoryPage);
        const accessoryRepository = AppDataSource.getRepository(Accessory);

        await storyPageRepository.query("DELETE FROM story_pages");
        await storyRepository.query("DELETE FROM stories");

        const accessories = [
            { id: 1, name: "Chapéu de Fazendeiro", imageUrl: "FarmerCapy.png", type: "hat", price: 0 },
            { id: 2, name: "Chapéu de Pirata", imageUrl: "PirateCapy.png", type: "hat", price: 50 },
            { id: 3, name: "Chapéu de Formando", imageUrl: "GradeCapy.png", type: "hat", price: 0 },
            { id: 4, name: "Óculos", imageUrl: "CapyGlasses.png", type: "glasses", price: 80 },
            { id: 5, name: "Boina de Intelectual", imageUrl: "ArtistCapy.png", type: "hat", price: 0 },
            { id: 6, name: "Chapéu de Aventureiro", imageUrl: "AdventureCapy.png", type: "hat", price: 0 },
        ];

        for (const accessoryData of accessories) {
            await accessoryRepository.save(accessoryData);
            console.log(
                `Acessório cadastrado: ${accessoryData.name} | ID: ${accessoryData.id}`
            );
        }

        const games = [
            {
                id: 1,
                title: "Siga a Ordem",
                description: "Coloque as imagens na ordem correta.",
                thumbnailUrl: "sequencingGame",
                type: "sequencing",
                difficultyLevel: 1,
                order: 1,
            },
            {
                id: 2,
                title: "Jogo da Memória",
                description: "Encontre os pares de imagens iguais.",
                thumbnailUrl: "memoryGame",
                type: "memory",
                difficultyLevel: 1,
                order: 2,
            },
            {
                id: 3,
                title: "Jogo do IGUAL",
                description: "Encontre a imagem que é igual à imagem apresentada.",
                thumbnailUrl: "equalityGame",
                type: "equality",
                difficultyLevel: 1,
                order: 3,
            },
        ];

        for (const gameData of games) {
            await gameRepository.save(gameData);
            console.log(
                `Jogo cadastrado: ${gameData.title} | ID: ${gameData.id}`
            );
        }

        const stories = [
            {
                id: 2,
                title: "A - Um Dia no Parque",
                cover: "storyA.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Hoje eu fui ao parque com minha família.\nO céu estava azul e tinha crianças brincando por todos os lados.\nEu olhei para o escorregador e fiquei com vontade de brincar.",
                        illustration: "storyA-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Primeiro eu observei as outras crianças brincando.\nUma criança subia a escada e depois descia pelo escorregador.\nEu fiquei olhando até entender como funcionava.",
                        illustration: "storyA-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Chegou a minha vez.\nEu subi devagar pela escada e segurei firme no corrimão.\nQuando cheguei lá em cima, respirei fundo e escorreguei.",
                        illustration: "storyA-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "Foi divertido!\nEu desci mais uma vez e depois fui brincar no balanço.\nÀs vezes, observar primeiro me ajuda a descobrir como participar.",
                        illustration: "storyA-page4.png",
                    },
                ],
            },

            {
                id: 3,
                title: "B - Meu Brinquedo Novo",
                cover: "storyB.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Hoje ganhei um brinquedo novo.\nEle tem muitas peças coloridas e parece um pouco complicado.\nEu coloquei as peças na mesa e comecei a observar.",
                        illustration: "storyB-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Peguei uma peça azul e tentei encaixar.\nNão funcionou na primeira tentativa.\nEu respirei fundo e tentei de outro jeito.",
                        illustration: "storyB-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Depois de algumas tentativas, encontrei o lugar certo.\nA peça encaixou e fez um pequeno clique.\nEu fiquei feliz porque descobri sozinho como fazer.",
                        illustration: "storyB-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "Continuei montando meu brinquedo, uma peça de cada vez.\nNem sempre consigo de primeira, e tudo bem.\nTentar novamente também faz parte de aprender.",
                        illustration: "storyB-page4.png",
                    },
                ],
            },

            {
                id: 4,
                title: "C - O Dia da Chuva",
                cover: "storyC.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Quando acordei, ouvi gotas batendo na janela.\nLá fora estava chovendo bastante.\nEu queria brincar no parque, mas hoje não seria possível.",
                        illustration: "storyC-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Por alguns minutos eu fiquei triste.\nEu gosto de saber o que vai acontecer e tinha imaginado meu dia de outro jeito.\nEntão fiquei olhando a chuva pela janela.",
                        illustration: "storyC-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Depois pensei em outras coisas que poderia fazer.\nPeguei meus blocos, alguns livros e meus lápis de cor.\nEscolhi desenhar uma casa com um grande guarda-chuva.",
                        illustration: "storyC-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "A chuva continuou caindo lá fora.\nMeu dia não aconteceu como eu imaginava, mas encontrei outra coisa divertida para fazer.\nÀs vezes os planos mudam, e podemos descobrir uma nova brincadeira.",
                        illustration: "storyC-page4.png",
                    },
                ],
            },

            {
                id: 5,
                title: "D - A Festa de Aniversário",
                cover: "storyD.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Hoje é aniversário da minha prima.\nQuando chegamos, havia balões, música e muitas pessoas.\nEu fiquei olhando tudo antes de entrar na brincadeira.",
                        illustration: "storyD-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Algumas crianças estavam correndo e outras estavam conversando.\nEu preferi ficar perto da mesa e observar.\nDepois encontrei um cantinho mais tranquilo para ficar um pouco.",
                        illustration: "storyD-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Quando me senti preparado, fui brincar com os balões.\nEu jogava o balão para cima e tentava pegá-lo antes que chegasse ao chão.\nUma criança veio brincar comigo.",
                        illustration: "storyD-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "Depois cantamos parabéns e comemos bolo.\nEu não precisei participar de tudo para aproveitar a festa.\nCada pessoa pode escolher como e quando quer participar.",
                        illustration: "storyD-page4.png",
                    },
                ],
            },

            {
                id: 6,
                title: "E - Conhecendo um Amigo",
                cover: "storyE.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Hoje uma criança nova chegou à minha turma.\nEla sentou perto de mim e estava brincando com carrinhos.\nEu fiquei curioso e observei a brincadeira.",
                        illustration: "storyE-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Peguei um carrinho vermelho e coloquei perto do outro carrinho.\nA criança olhou para mim e sorriu.\nNós começamos a fazer uma pista usando blocos.",
                        illustration: "storyE-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Cada um escolheu uma parte da pista.\nEu fiz uma ponte e meu novo amigo fez uma garagem.\nDepois colocamos os carrinhos para andar juntos.",
                        illustration: "storyE-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "Foi divertido brincar juntos.\nDescobri que podemos brincar de maneiras diferentes e ainda assim nos divertir.\nTalvez amanhã possamos construir outra pista.",
                        illustration: "storyE-page4.png",
                    },
                ],
            },

            {
                id: 7,
                title: "F - Minha Rotina da Manhã",
                cover: "storyF.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Quando acordo, gosto de saber o que vou fazer primeiro.\nHoje eu olhei minha rotina e vi três coisas: vestir a roupa, tomar café e escovar os dentes.",
                        illustration: "storyF-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Primeiro coloquei minha roupa.\nDepois fui para a mesa tomar café.\nQuando terminei, coloquei meu copo na pia.",
                        illustration: "storyF-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Depois fui escovar os dentes.\nOlhei para minha rotina novamente e percebi que já tinha terminado todas as atividades.\nEu consegui seguir cada passo.",
                        illustration: "storyF-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "Agora sei o que vem depois de cada atividade.\nTer uma rotina me ajuda a entender o meu dia.\nQuando termino uma tarefa, posso olhar o próximo passo.",
                        illustration: "storyF-page4.png",
                    },
                ],
            },

            {
                id: 8,
                title: "G - Guardando os Brinquedos",
                cover: "storyG.png",
                pages: [
                    {
                        pageNumber: 1,
                        text: "Depois de brincar, percebi que havia brinquedos espalhados pelo quarto.\nTinha blocos no chão, carrinhos perto da cama e livros sobre a mesa.\nEu olhei para aquela bagunça e pensei por onde começar.",
                        illustration: "storyG-page1.png",
                    },
                    {
                        pageNumber: 2,
                        text: "Decidi começar pelos carrinhos.\nPeguei um por um e coloquei dentro da caixa azul.\nDepois juntei os blocos e coloquei na caixa vermelha.",
                        illustration: "storyG-page2.png",
                    },
                    {
                        pageNumber: 3,
                        text: "Os livros foram para a estante.\nAlguns estavam grandes e outros pequenos, então coloquei cada um no seu lugar.\nAos poucos, o quarto foi ficando organizado.",
                        illustration: "storyG-page3.png",
                    },
                    {
                        pageNumber: 4,
                        text: "Quando terminei, consegui encontrar espaço para andar e brincar novamente.\nGuardar os brinquedos depois de usar deixa tudo mais fácil de encontrar.\nEu consegui organizar meu espaço, uma coisa de cada vez.",
                        illustration: "storyG-page4.png",
                    },
                ],
            },
        ];

        for (const storyData of stories) {
            let story = await storyRepository.findOne({
                where: { id: storyData.id },
            });

            if (!story) {
                story = storyRepository.create({
                    id: storyData.id,
                    title: storyData.title,
                    cover: storyData.cover,
                });

                story = await storyRepository.save(story);

                console.log(
                    `História cadastrada: ${story.title} | ID: ${story.id}`
                );
            } else {
                story.title = storyData.title;
                story.cover = storyData.cover;

                await storyRepository.save(story);

                console.log(
                    `História atualizada: ${story.title} | ID: ${story.id}`
                );

                await storyPageRepository.delete({
                    story: { id: story.id },
                });
            }

            const pages = storyData.pages.map((page) =>
                storyPageRepository.create({
                    pageNumber: page.pageNumber,
                    text: page.text,
                    illustration: page.illustration,
                    story: story,
                })
            );

            await storyPageRepository.save(pages);

            console.log(
                ` -> ${pages.length} páginas associadas à história ${story.id}`
            );
        }
        console.log("\n========================================");
        console.log("       SEED FINALIZADA COM SUCESSO");
        console.log("========================================\n");

        await AppDataSource.destroy();
    } catch (error) {
        console.error("\nErro ao executar a seed:");
        console.error(error);

        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }

        process.exit(1);
    }
}

seed();