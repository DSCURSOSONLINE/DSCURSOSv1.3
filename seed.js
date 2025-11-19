const pool = require("./db");

async function seed() {
  console.log("🔄 Iniciando SEED profissional...");

  // limpar tabelas
  await pool.query("DELETE FROM comentarios");
  await pool.query("DELETE FROM aula_concluida");
  await pool.query("DELETE FROM aula_tempo");
  await pool.query("DELETE FROM enrollments");
  await pool.query("DELETE FROM aulas");
  await pool.query("DELETE FROM modulos");
  await pool.query("DELETE FROM cursos");

  console.log("🧹 Tabelas limpas!");

  // cursos profissionais
  const cursos = [
    {
      titulo: "Formação Front-end Completa",
      descricao:
        "Aprenda HTML, CSS, JavaScript, APIs, GitHub e desenvolvimento moderno com projetos reais.",
      categoria: "Front-end",
      thumb: "/img/course-frontend.png",
      modulos: [
        {
          titulo: "Fundamentos Web",
          aulas: [
            {
              titulo: "Introdução ao Desenvolvimento Web",
              descricao: "Entenda como funciona o navegador, requisições e arquivos do front.",
              url: "https://www.youtube.com/embed/UB1O30fR-EE"
            },
            {
              titulo: "HTML5 do Zero ao Avançado",
              descricao: "Tags, semântica, SEO, formulários e boas práticas.",
              url: "https://www.youtube.com/embed/qz0aGYrrlhU"
            }
          ]
        },
        {
          titulo: "CSS Moderno",
          aulas: [
            {
              titulo: "Flexbox para Layouts Responsivos",
              descricao: "Aprenda a dominar o Flexbox com exemplos práticos.",
              url: "https://www.youtube.com/embed/fYq5PXgSsbE"
            },
            {
              titulo: "Grid Layout Avançado",
              descricao: "Crie layouts complexos de forma fácil e escalável.",
              url: "https://www.youtube.com/embed/jV8B24rSN5o"
            }
          ]
        }
      ]
    },
    {
      titulo: "Formação Back-end com Node.js",
      descricao:
        "Aprenda a criar APIs profissionais com Node, Express, JWT, MySQL e arquitetura limpa.",
      categoria: "Back-end",
      thumb: "/img/course-backend.png",
      modulos: [
        {
          titulo: "Node.js Básico",
          aulas: [
            {
              titulo: "O que é Node.js?",
              descricao: "Entenda o runtime V8, Event Loop e funcionamento interno.",
              url: "https://www.youtube.com/embed/TlB_eWDSMt4"
            },
            {
              titulo: "Primeiro Servidor com Express",
              descricao: "Crie uma API do zero usando boas práticas.",
              url: "https://www.youtube.com/embed/L72fhGm1tfE"
            }
          ]
        },
        {
          titulo: "Banco de Dados MySQL",
          aulas: [
            {
              titulo: "Modelagem de Banco de Dados",
              descricao: "Normalização, chaves, relacionamentos e modelagem profissional.",
              url: "https://www.youtube.com/embed/1uFY60CESlM"
            },
            {
              titulo: "Conectando Node ao MySQL",
              descricao: "Queries, pool, prepared statements e segurança.",
              url: "https://www.youtube.com/embed/ENrx6ivvNns"
            }
          ]
        }
      ]
    },
    {
      titulo: "Administração de Redes e Segurança",
      descricao:
        "Forma profissionais em redes, segurança, firewalls, VLANs, protocolos e práticas do mercado.",
      categoria: "Redes",
      thumb: "/img/course-network.png",
      modulos: [
        {
          titulo: "Fundamentos de Redes",
          aulas: [
            {
              titulo: "Modelo OSI e TCP/IP",
              descricao: "Compreenda o funcionamento de redes modernas.",
              url: "https://www.youtube.com/embed/IPvYjXCsTg8"
            },
            {
              titulo: "Endereçamento IPv4",
              descricao: "CIDR, classes, máscaras e sub-redes.",
              url: "https://www.youtube.com/embed/lx3GvncEfu8"
            }
          ]
        },
        {
          titulo: "Segurança de Redes",
          aulas: [
            {
              titulo: "Firewall, IDS e IPS",
              descricao: "Proteção de redes corporativas.",
              url: "https://www.youtube.com/embed/fkKdQRFSpXY"
            },
            {
              titulo: "Ataques comuns e defesas",
              descricao: "Mitigação contra DoS, MITM, brute-force e vírus.",
              url: "https://www.youtube.com/embed/9IfhSofYyNc"
            }
          ]
        }
      ]
    },
    {
      titulo: "Linux & Servidores",
      descricao:
        "Aprenda Linux, Shell Script, administração de servidores, deploy, SSH, logs e processos.",
      categoria: "DevOps",
      thumb: "/img/course-linux.png",
      modulos: [
        {
          titulo: "Linux Essentials",
          aulas: [
            {
              titulo: "Comandos Fundamentais do Linux",
              descricao: "Navegação, permissões, usuários e diretórios.",
              url: "https://www.youtube.com/embed/ivDjWYcKDZI"
            },
            {
              titulo: "Gerenciamento de Pacotes",
              descricao: "apt, yum, pacman e melhores práticas.",
              url: "https://www.youtube.com/embed/4wVD9mYXyp8"
            }
          ]
        },
        {
          titulo: "Servidores",
          aulas: [
            {
              titulo: "Configuração de Servidor Web",
              descricao: "Apache, Nginx, proxies e otimização.",
              url: "https://www.youtube.com/embed/JKxlsvZXG7c"
            },
            {
              titulo: "Logs, Monitoramento e Processos",
              descricao: "top, ps, journalctl, logs do sistema.",
              url: "https://www.youtube.com/embed/EtuYhF-1lyw"
            }
          ]
        }
      ]
    }
  ];

  let totalCursos = 0;
  let totalModulos = 0;
  let totalAulas = 0;

  // inserir tudo
  for (const curso of cursos) {
    const [resCurso] = await pool.query(
      "INSERT INTO cursos (titulo, descricao, categoria, thumb) VALUES (?, ?, ?, ?)",
      [curso.titulo, curso.descricao, curso.categoria, curso.thumb]
    );

    const cursoId = resCurso.insertId;
    totalCursos++;

    for (const modulo of curso.modulos) {
      const [resModulo] = await pool.query(
        "INSERT INTO modulos (curso_id, titulo) VALUES (?, ?)",
        [cursoId, modulo.titulo]
      );

      const moduloId = resModulo.insertId;
      totalModulos++;

      for (const aula of modulo.aulas) {
        await pool.query(
          "INSERT INTO aulas (modulo_id, titulo, descricao, url_video) VALUES (?, ?, ?, ?)",
          [moduloId, aula.titulo, aula.descricao, aula.url]
        );
        totalAulas++;
      }
    }
  }

  console.log(`✅ ${totalCursos} cursos criados`);
  console.log(`📘 ${totalModulos} módulos criados`);
  console.log(`🎥 ${totalAulas} aulas criadas`);
  console.log("✨ SEED profissional concluído!");

  process.exit();
}

seed();
