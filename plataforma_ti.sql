-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/11/2025 às 19:45
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `plataforma_ti`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `aulas`
--

CREATE TABLE `aulas` (
  `id` int(11) NOT NULL,
  `modulo_id` int(11) DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `url_video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `aulas`
--

INSERT INTO `aulas` (`id`, `modulo_id`, `titulo`, `descricao`, `url_video`) VALUES
(1, 1, 'Introdução ao Desenvolvimento Web', 'Entenda como funciona o navegador, requisições e arquivos do front.', 'https://www.youtube.com/embed/UB1O30fR-EE'),
(2, 1, 'HTML5 do Zero ao Avançado', 'Tags, semântica, SEO, formulários e boas práticas.', 'https://www.youtube.com/embed/qz0aGYrrlhU'),
(3, 2, 'Flexbox para Layouts Responsivos', 'Aprenda a dominar o Flexbox com exemplos práticos.', 'https://www.youtube.com/embed/fYq5PXgSsbE'),
(4, 2, 'Grid Layout Avançado', 'Crie layouts complexos de forma fácil e escalável.', 'https://www.youtube.com/embed/jV8B24rSN5o'),
(5, 3, 'O que é Node.js?', 'Entenda o runtime V8, Event Loop e funcionamento interno.', 'https://www.youtube.com/embed/TlB_eWDSMt4'),
(6, 3, 'Primeiro Servidor com Express', 'Crie uma API do zero usando boas práticas.', 'https://www.youtube.com/embed/L72fhGm1tfE'),
(7, 4, 'Modelagem de Banco de Dados', 'Normalização, chaves, relacionamentos e modelagem profissional.', 'https://www.youtube.com/embed/1uFY60CESlM'),
(8, 4, 'Conectando Node ao MySQL', 'Queries, pool, prepared statements e segurança.', 'https://www.youtube.com/embed/ENrx6ivvNns'),
(9, 5, 'Modelo OSI e TCP/IP', 'Compreenda o funcionamento de redes modernas.', 'https://www.youtube.com/embed/IPvYjXCsTg8'),
(10, 5, 'Endereçamento IPv4', 'CIDR, classes, máscaras e sub-redes.', 'https://www.youtube.com/embed/lx3GvncEfu8'),
(11, 6, 'Firewall, IDS e IPS', 'Proteção de redes corporativas.', 'https://www.youtube.com/embed/fkKdQRFSpXY'),
(12, 6, 'Ataques comuns e defesas', 'Mitigação contra DoS, MITM, brute-force e vírus.', 'https://www.youtube.com/embed/9IfhSofYyNc'),
(13, 7, 'Comandos Fundamentais do Linux', 'Navegação, permissões, usuários e diretórios.', 'https://www.youtube.com/embed/ivDjWYcKDZI'),
(14, 7, 'Gerenciamento de Pacotes', 'apt, yum, pacman e melhores práticas.', 'https://www.youtube.com/embed/4wVD9mYXyp8'),
(15, 8, 'Configuração de Servidor Web', 'Apache, Nginx, proxies e otimização.', 'https://www.youtube.com/embed/JKxlsvZXG7c'),
(16, 8, 'Logs, Monitoramento e Processos', 'top, ps, journalctl, logs do sistema.', 'https://www.youtube.com/embed/EtuYhF-1lyw');

-- --------------------------------------------------------

--
-- Estrutura para tabela `aula_concluida`
--

CREATE TABLE `aula_concluida` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `aula_id` int(11) DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `aula_tempo`
--

CREATE TABLE `aula_tempo` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `aula_id` int(11) DEFAULT NULL,
  `inicio` datetime DEFAULT NULL,
  `fim` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `aula_tempo`
--

INSERT INTO `aula_tempo` (`id`, `user_id`, `aula_id`, `inicio`, `fim`) VALUES
(3, 1, 13, '2025-11-19 11:45:18', '2025-11-19 11:45:22'),
(4, 1, 13, '2025-11-19 11:45:22', '2025-11-19 11:45:23'),
(5, 1, 14, '2025-11-19 11:45:23', '2025-11-19 11:45:25'),
(6, 1, 13, '2025-11-19 11:45:35', '2025-11-19 11:47:29'),
(7, 1, 13, '2025-11-19 11:47:29', '2025-11-19 11:47:32'),
(8, 1, 13, '2025-11-19 11:47:44', '2025-11-19 11:47:45'),
(9, 1, 13, '2025-11-19 12:13:12', '2025-11-19 12:13:14'),
(10, 5, 13, '2025-11-19 12:14:53', '2025-11-19 12:14:54'),
(11, 5, 13, '2025-11-19 12:14:54', '2025-11-19 12:14:56'),
(12, 5, 14, '2025-11-19 12:14:56', '2025-11-19 12:14:59'),
(13, 5, 14, '2025-11-19 12:15:01', '2025-11-19 12:15:03'),
(14, 1, 13, '2025-11-19 12:16:16', '2025-11-19 12:16:22');

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `aula_id` int(11) DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `cursos`
--

INSERT INTO `cursos` (`id`, `titulo`, `descricao`, `categoria`, `thumb`) VALUES
(1, 'Formação Front-end Completa', 'Aprenda HTML, CSS, JavaScript, APIs, GitHub e desenvolvimento moderno com projetos reais.', 'Front-end', '/img/course-frontend.png'),
(2, 'Formação Back-end com Node.js', 'Aprenda a criar APIs profissionais com Node, Express, JWT, MySQL e arquitetura limpa.', 'Back-end', '/img/course-backend.png'),
(3, 'Administração de Redes e Segurança', 'Forma profissionais em redes, segurança, firewalls, VLANs, protocolos e práticas do mercado.', 'Redes', '/img/course-network.png'),
(4, 'Linux & Servidores', 'Aprenda Linux, Shell Script, administração de servidores, deploy, SSH, logs e processos.', 'DevOps', '/img/course-linux.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `data_matricula` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `curso_id`, `data_matricula`) VALUES
(1, 1, 4, '2025-11-19 10:29:53'),
(3, 1, 3, '2025-11-19 11:38:37'),
(4, 1, 2, '2025-11-19 11:38:41'),
(6, 5, 4, '2025-11-19 12:14:44');

-- --------------------------------------------------------

--
-- Estrutura para tabela `modulos`
--

CREATE TABLE `modulos` (
  `id` int(11) NOT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `modulos`
--

INSERT INTO `modulos` (`id`, `curso_id`, `titulo`) VALUES
(1, 1, 'Fundamentos Web'),
(2, 1, 'CSS Moderno'),
(3, 2, 'Node.js Básico'),
(4, 2, 'Banco de Dados MySQL'),
(5, 3, 'Fundamentos de Redes'),
(6, 3, 'Segurança de Redes'),
(7, 4, 'Linux Essentials'),
(8, 4, 'Servidores');

-- --------------------------------------------------------

--
-- Estrutura para tabela `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(200) DEFAULT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `interesses` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `nome`, `email`, `senha`, `telefone`, `interesses`, `foto`, `admin`) VALUES
(1, 'Wemerson Dutra', 'wemer121@gmail.com', '$2b$10$ZyBGTbhhvRVyhAiq1gJd2e948FCWhcuc/l3J5hXIcj5aJ5o7Mxq/O', NULL, NULL, NULL, 1),
(2, 'Teste 157', 'wemer12@gmail.com', '$2b$10$l1xi0zFqruSdl2fr0GAWmuuKbppuSJdX4Bxd5aP6MqXjXuqEV/x7W', '', '', NULL, 0),
(5, 'André Guees', 'andre@gmail.com', '$2b$10$6LVue.7H2kugDIp7E1JSLeCtwKdDlCuKpvTdXsRRixJlSeGVdiRVq', NULL, NULL, NULL, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aulas`
--
ALTER TABLE `aulas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modulo_id` (`modulo_id`);

--
-- Índices de tabela `aula_concluida`
--
ALTER TABLE `aula_concluida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `aula_id` (`aula_id`);

--
-- Índices de tabela `aula_tempo`
--
ALTER TABLE `aula_tempo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `aula_id` (`aula_id`);

--
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `aula_id` (`aula_id`);

--
-- Índices de tabela `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_course` (`user_id`,`curso_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Índices de tabela `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Índices de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aulas`
--
ALTER TABLE `aulas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `aula_concluida`
--
ALTER TABLE `aula_concluida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `aula_tempo`
--
ALTER TABLE `aula_tempo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aulas`
--
ALTER TABLE `aulas`
  ADD CONSTRAINT `aulas_ibfk_1` FOREIGN KEY (`modulo_id`) REFERENCES `modulos` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `aula_concluida`
--
ALTER TABLE `aula_concluida`
  ADD CONSTRAINT `aula_concluida_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `aula_concluida_ibfk_2` FOREIGN KEY (`aula_id`) REFERENCES `aulas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `aula_tempo`
--
ALTER TABLE `aula_tempo`
  ADD CONSTRAINT `aula_tempo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `aula_tempo_ibfk_2` FOREIGN KEY (`aula_id`) REFERENCES `aulas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`aula_id`) REFERENCES `aulas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `modulos`
--
ALTER TABLE `modulos`
  ADD CONSTRAINT `modulos_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
