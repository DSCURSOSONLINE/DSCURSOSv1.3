/* ============================================================
   SISTEMA UNIVERSAL DE TRADUÇÃO (PT → EN)
   - Tradução manual
   - Tradução automática fallback
   - Cache localStorage
   - Botão flutuante 🇧🇷/🇺🇸
============================================================ */

let idiomaAtual = localStorage.getItem("idioma") || "pt";
const traducaoCache = JSON.parse(localStorage.getItem("traducaoCache") || "{}");

const traducoes = {
  en: {
    /* ----------------------------------------------------------
       LOGIN / REGISTRO
    ---------------------------------------------------------- */
    "Entrar": "Login",
    "Fazer Login": "Sign In",
    "Acessar conta": "Access account",
    "Criar conta": "Create account",
    "Registrar": "Register",
    "Email": "Email",
    "Senha": "Password",
    "Confirmar senha": "Confirm password",
    "Já possui conta?": "Already have an account?",
    "Não possui conta?": "Don't have an account?",
    "Continuar": "Continue",
    "Sair": "Logout",
    "Nome": "Name",

    /* ----------------------------------------------------------
       NAVEGAÇÃO
    ---------------------------------------------------------- */
    "Início": "Home",
    "Cursos": "Courses",
    "Aulas": "Lessons",
    "Perfil": "Profile",
    "Configurações": "Settings",
    "Notificações": "Notifications",
    "Ajuda": "Help",
    "Pesquisar": "Search",
    "Buscar cursos": "Search courses",

    /* ----------------------------------------------------------
       HOME DO ALUNO
    ---------------------------------------------------------- */
    "Bem-vindo!": "Welcome!",
    "Bem-vindo de volta!": "Welcome back!",
    "Aqui estão suas novidades": "Here are your updates",
    "Avisos importantes": "Important alerts",
    "Continue de onde parou": "Continue where you left off",
    "Seus cursos": "Your courses",

    /* ----------------------------------------------------------
       CURSOS
    ---------------------------------------------------------- */
    "Cursos disponíveis": "Available courses",
    "Ver Curso": "View Course",
    "Acessar Curso": "Access Course",
    "Iniciar Curso": "Start Course",
    "Continuar Curso": "Continue Course",
    "Descrição do curso": "Course description",
    "Adicionar aos favoritos": "Add to favorites",
    "Remover dos favoritos": "Remove from favorites",
    "Matricular": "Enroll",
    "Você já está matriculado": "You are already enrolled",

    /* ----------------------------------------------------------
       AULAS / MÓDULOS
    ---------------------------------------------------------- */
    "Aula": "Lesson",
    "Assista agora": "Watch now",
    "Próxima aula": "Next lesson",
    "Aula anterior": "Previous lesson",
    "Comentários": "Comments",
    "Enviar comentário": "Send comment",

    /* ----------------------------------------------------------
       PERFIL
    ---------------------------------------------------------- */
    "Meu perfil": "My profile",
    "Informações pessoais": "Personal information",
    "Telefone": "Phone",
    "Interesses": "Interests",
    "Salvar Alterações": "Save changes",
    "Atualizar foto": "Update photo",
    "Alterações salvas com sucesso": "Changes saved successfully",

    /* ----------------------------------------------------------
       ADMINISTRADOR
    ---------------------------------------------------------- */
    "Painel do Administrador": "Admin Panel",
    "Dashboard": "Dashboard",
    "Gerenciar cursos": "Manage courses",
    "Gerenciar usuários": "Manage users",
    "Gerenciar aulas": "Manage lessons",
    "Gerenciar módulos": "Manage modules",
    "Enviar notificação": "Send notification",
    "Criar novo curso": "Create new course",
    "Excluir": "Delete",
    "Editar": "Edit",

    /* ----------------------------------------------------------
       SISTEMA/MENSAGENS
    ---------------------------------------------------------- */
    "Carregando...": "Loading...",
    "Erro": "Error",
    "Sucesso": "Success",
    "Tem certeza?": "Are you sure?",
    "Algo deu errado": "Something went wrong",
    "Tente novamente": "Try again"
  }
};

/* ============================================================
   TRADUÇÃO AUTOMÁTICA
============================================================ */

async function traduzirAutomatico(texto) {
  if (!texto.trim()) return texto;

  if (traducaoCache[texto]) return traducaoCache[texto];

  try {
    const resp = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texto,
        source: "pt",
        target: "en",
        format: "text"
      })
    });

    const json = await resp.json();

    if (json.translatedText) {
      traducaoCache[texto] = json.translatedText;
      localStorage.setItem("traducaoCache", JSON.stringify(traducaoCache));
      return json.translatedText;
    }
  } catch (err) {
    console.error("Erro na tradução automática:", err);
  }

  return texto;
}

/* ============================================================
   TRADUZIR TODOS OS TEXTOS DA PÁGINA
============================================================ */

async function traduzirPagina() {
  if (idiomaAtual === "pt") return;

  const elements = document.querySelectorAll("*:not(script):not(style):not(.no-translate)");

  for (const el of elements) {
    const node = el.childNodes[0];
    if (!node || node.nodeType !== 3) continue;

    const textoOriginal = node.nodeValue.trim();
    if (!textoOriginal) continue;

    if (traducoes.en[textoOriginal]) {
      node.nodeValue = traducoes.en[textoOriginal];
      continue;
    }

    const traduzido = await traduzirAutomatico(textoOriginal);
    node.nodeValue = traduzido;
  }
}

/* ============================================================
   FUNÇÃO TROCAR IDIOMA
============================================================ */

function alternarIdioma() {
  idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
  localStorage.setItem("idioma", idiomaAtual);
  location.reload();
}

/* ============================================================
   ATIVAR BOTÕES DE TRADUÇÃO
============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  await traduzirPagina();

  // botão do header
  const btnHeader = document.getElementById("traduzirBtn");
  if (btnHeader) {
    btnHeader.textContent = idiomaAtual === "pt" ? "🇧🇷" : "🇺🇸";
    btnHeader.onclick = alternarIdioma;
  }

  // botão flutuante
  const btnFloat = document.getElementById("traduzirBtnFloat");
  if (btnFloat) {
    btnFloat.innerHTML = idiomaAtual === "pt" ? "🇧🇷" : "🇺🇸";
    btnFloat.onclick = alternarIdioma;
  }
});
