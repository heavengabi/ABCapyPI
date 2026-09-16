import { AppDataSource } from "../config/data-source";
import { Game } from "../models/Games";
import { Accessory } from "../models/Accessories";
import { Pictograms } from "../models/AACcards";
import { Story } from "../models/Story";
import { StoryPage } from "../models/StoryPage";

async function runSeeds() {
  console.log("Iniciando o processo de Seed no banco de dados...");

  await AppDataSource.initialize();

  const gameRepo = AppDataSource.getRepository(Game);
  const accessoryRepo = AppDataSource.getRepository(Accessory);
  const aacRepo = AppDataSource.getRepository(Pictograms);
  const storyRepo = AppDataSource.getRepository(Story);
  const pageRepo = AppDataSource.getRepository(StoryPage);

  // 1. Minijogos
  const gamesCount = await gameRepo.count();
  if (gamesCount === 0) {
    await gameRepo.save([
      {
        title: "Jogo da Memória dos Bichos",
        description: "Encontre os pares dos animais brasileiros e exercite sua memória.",
        thumbnailUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400",
        type: "memory",
        difficultyLevel: 1,
      },
      {
        title: "Ligue as Formas",
        description: "Arraste as formas geométricas até os seus respectivos encaixes.",
        thumbnailUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
        type: "drag-drop",
        difficultyLevel: 1,
      },
      {
        title: "Qual é a Cor?",
        description: "Descubra as cores corretas dos elementos da natureza.",
        thumbnailUrl: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=400",
        type: "quiz",
        difficultyLevel: 2,
      },
    ]);
    console.log("Jogos cadastrados com sucesso!");
  }

  // 2. Acessórios da Capivara
  const accessoriesCount = await accessoryRepo.count();
  if (accessoriesCount === 0) {
    await accessoryRepo.save([
      {
        name: "Chapéu de Palha",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3673/3673757.png",
        type: "hat",
        price: 5,
      },
      {
        name: "Óculos de Sol",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/648/648356.png",
        type: "glasses",
        price: 10,
      },
      {
        name: "Laço Vermelho",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        type: "head",
        price: 8,
      },
      {
        name: "Capa de Super-Herói",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3050/3050239.png",
        type: "body",
        price: 15,
      },
      {
        name: "Coroa de Flores",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/4207/4207253.png",
        type: "head",
        price: 12,
      },
    ]);
    console.log("Acessórios cadastrados com sucesso!");
  }

  // 3. Cartões CAA (Pictogramas de Comunicação Alternativa)
  const aacCount = await aacRepo.count();
  if (aacCount === 0) {
    await aacRepo.save([
      {
        name: "Sim",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
        category: "respostas",
      },
      {
        name: "Não",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
        category: "respostas",
      },
      {
        name: "Água",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png",
        category: "necessidades",
      },
      {
        name: "Comida / Fome",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        category: "necessidades",
      },
      {
        name: "Banheiro",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2210/2210214.png",
        category: "necessidades",
      },
      {
        name: "Feliz",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
        category: "emocoes",
      },
      {
        name: "Triste",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/742/742752.png",
        category: "emocoes",
      },
      {
        name: "Brincar",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
        category: "acoes",
      },
      {
        name: "Ajuda",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/4862/4862457.png",
        category: "acoes",
      },
    ]);
    console.log("Cartões CAA cadastrados com sucesso!");
  }

  // 4. Histórias com Páginas
  const storiesCount = await storyRepo.count();
  if (storiesCount === 0) {
    // História 1
    const story1 = await storyRepo.save({
      title: "As Aventuras de Capy no Rio",
      cover: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400",
    });

    await pageRepo.save([
      {
        pageNumber: 1,
        text: "Era uma manhã ensolarada e a pequena Capy acordou com muita vontade de nadar.",
        illustration: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        audioUrl: "https://exemplo.com/audios/capy_p1.mp3",
        story: story1,
      },
      {
        pageNumber: 2,
        text: "No caminho até o rio, Capy encontrou seu amigo Tico, o passarinho cantador.",
        illustration: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600",
        audioUrl: "https://exemplo.com/audios/capy_p2.mp3",
        story: story1,
      },
      {
        pageNumber: 3,
        text: "Juntos, eles mergulharam na água fresquinha e brincaram a tarde toda!",
        illustration: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
        audioUrl: "https://exemplo.com/audios/capy_p3.mp3",
        story: story1,
      },
    ]);

    // História 2
    const story2 = await storyRepo.save({
      title: "O Jardim das Cores",
      cover: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
    });

    await pageRepo.save([
      {
        pageNumber: 1,
        text: "Capy adora passear pelo jardim e observar as diferentes flores coloridas.",
        illustration: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
        audioUrl: "https://exemplo.com/audios/jardim_p1.mp3",
        story: story2,
      },
      {
        pageNumber: 2,
        text: "Ela viu flores amarelas brilhando como o sol e borboletas azuis voando pelo céu.",
        illustration: "https://images.unsplash.com/photo-1508672019048-805b876b67e2?w=600",
        audioUrl: "https://exemplo.com/audios/jardim_p2.mp3",
        story: story2,
      },
    ]);

    console.log("Histórias e páginas cadastradas com sucesso!");
  }

  console.log("Todos os seeds foram aplicados com sucesso!");
  process.exit(0);
}

runSeeds().catch((error) => {
  console.error("Erro ao executar os seeds:", error);
  process.exit(1);
});