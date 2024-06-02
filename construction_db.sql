-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2024 at 06:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `construction_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add projects', 7, 'add_projects'),
(26, 'Can change projects', 7, 'change_projects'),
(27, 'Can delete projects', 7, 'delete_projects'),
(28, 'Can view projects', 7, 'view_projects'),
(29, 'Can add client', 8, 'add_client'),
(30, 'Can change client', 8, 'change_client'),
(31, 'Can delete client', 8, 'delete_client'),
(32, 'Can view client', 8, 'view_client'),
(33, 'Can add employee', 9, 'add_employee'),
(34, 'Can change employee', 9, 'change_employee'),
(35, 'Can delete employee', 9, 'delete_employee'),
(36, 'Can view employee', 9, 'view_employee'),
(37, 'Can add user', 10, 'add_user'),
(38, 'Can change user', 10, 'change_user'),
(39, 'Can delete user', 10, 'delete_user'),
(40, 'Can view user', 10, 'view_user'),
(41, 'Can add expense', 11, 'add_expense'),
(42, 'Can change expense', 11, 'change_expense'),
(43, 'Can delete expense', 11, 'delete_expense'),
(44, 'Can view expense', 11, 'view_expense'),
(45, 'Can add payments', 12, 'add_payments'),
(46, 'Can change payments', 12, 'change_payments'),
(47, 'Can delete payments', 12, 'delete_payments'),
(48, 'Can view payments', 12, 'view_payments'),
(49, 'Can add tasks', 13, 'add_tasks'),
(50, 'Can change tasks', 13, 'change_tasks'),
(51, 'Can delete tasks', 13, 'delete_tasks'),
(52, 'Can view tasks', 13, 'view_tasks'),
(53, 'Can add material', 14, 'add_material'),
(54, 'Can change material', 14, 'change_material'),
(55, 'Can delete material', 14, 'delete_material'),
(56, 'Can view material', 14, 'view_material'),
(57, 'Can add role', 15, 'add_role'),
(58, 'Can change role', 15, 'change_role'),
(59, 'Can delete role', 15, 'delete_role'),
(60, 'Can view role', 15, 'view_role'),
(61, 'Can add payment_ methode', 16, 'add_payment_methode'),
(62, 'Can change payment_ methode', 16, 'change_payment_methode'),
(63, 'Can delete payment_ methode', 16, 'delete_payment_methode'),
(64, 'Can view payment_ methode', 16, 'view_payment_methode'),
(65, 'Can add design', 17, 'add_design'),
(66, 'Can change design', 17, 'change_design'),
(67, 'Can delete design', 17, 'delete_design'),
(68, 'Can view design', 17, 'view_design'),
(69, 'Can add payment_ type', 18, 'add_payment_type'),
(70, 'Can change payment_ type', 18, 'change_payment_type'),
(71, 'Can delete payment_ type', 18, 'delete_payment_type'),
(72, 'Can view payment_ type', 18, 'view_payment_type'),
(73, 'Can add companies', 19, 'add_companies'),
(74, 'Can change companies', 19, 'change_companies'),
(75, 'Can delete companies', 19, 'delete_companies'),
(76, 'Can view companies', 19, 'view_companies');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_client`
--

CREATE TABLE `client_client` (
  `id` bigint(20) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_image` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `document_image` varchar(100) NOT NULL,
  `issue_date` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies_companies`
--

CREATE TABLE `companies_companies` (
  `id` bigint(20) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_logo` varchar(100) NOT NULL,
  `company_address` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `issue_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_design`
--

CREATE TABLE `design_design` (
  `id` bigint(20) NOT NULL,
  `architecture` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `issue_date` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(8, 'Client', 'client'),
(19, 'companies', 'companies'),
(5, 'contenttypes', 'contenttype'),
(17, 'Design', 'design'),
(9, 'Employee', 'employee'),
(12, 'invoice_reciept', 'payments'),
(14, 'Material', 'material'),
(11, 'payment', 'expense'),
(16, 'Payment_Methode', 'payment_methode'),
(18, 'Payment_Type', 'payment_type'),
(7, 'Projects', 'projects'),
(15, 'Role', 'role'),
(6, 'sessions', 'session'),
(13, 'Tasks', 'tasks'),
(10, 'user', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'Employee', '0001_initial', '2024-05-18 13:55:19.730390'),
(2, 'Role', '0001_initial', '2024-05-18 13:55:31.135689'),
(3, 'user', '0001_initial', '2024-05-18 13:55:56.111814'),
(4, 'Payment_Type', '0001_initial', '2024-05-18 13:56:48.801268'),
(5, 'Payment_Methode', '0001_initial', '2024-05-18 13:56:57.499685'),
(6, 'Client', '0001_initial', '2024-05-18 13:57:27.308661'),
(7, 'Design', '0001_initial', '2024-05-18 13:58:03.906083'),
(8, 'Projects', '0001_initial', '2024-05-18 14:00:28.258712'),
(9, 'invoice_reciept', '0001_initial', '2024-05-18 14:00:28.602057'),
(10, 'Material', '0001_initial', '2024-05-18 14:02:13.601645'),
(11, 'payment', '0001_initial', '2024-05-18 14:02:57.408508'),
(12, 'Tasks', '0001_initial', '2024-05-18 14:06:34.904870'),
(13, 'companies', '0001_initial', '2024-05-18 14:07:03.655269'),
(14, 'contenttypes', '0001_initial', '2024-05-18 14:08:53.131110'),
(15, 'auth', '0001_initial', '2024-05-18 14:08:53.709213'),
(16, 'admin', '0001_initial', '2024-05-18 14:08:53.912317'),
(17, 'admin', '0002_logentry_remove_auto_add', '2024-05-18 14:08:53.927954'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-05-18 14:08:53.943561'),
(19, 'contenttypes', '0002_remove_content_type_name', '2024-05-18 14:08:54.006053'),
(20, 'auth', '0002_alter_permission_name_max_length', '2024-05-18 14:08:54.068559'),
(21, 'auth', '0003_alter_user_email_max_length', '2024-05-18 14:08:54.084171'),
(22, 'auth', '0004_alter_user_username_opts', '2024-05-18 14:08:54.084171'),
(23, 'auth', '0005_alter_user_last_login_null', '2024-05-18 14:08:54.146666'),
(24, 'auth', '0006_require_contenttypes_0002', '2024-05-18 14:08:54.146666'),
(25, 'auth', '0007_alter_validators_add_error_messages', '2024-05-18 14:08:54.146666'),
(26, 'auth', '0008_alter_user_username_max_length', '2024-05-18 14:08:54.162303'),
(27, 'auth', '0009_alter_user_last_name_max_length', '2024-05-18 14:08:54.177912'),
(28, 'auth', '0010_alter_group_name_max_length', '2024-05-18 14:08:54.209163'),
(29, 'auth', '0011_update_proxy_permissions', '2024-05-18 14:08:54.224786'),
(30, 'auth', '0012_alter_user_first_name_max_length', '2024-05-18 14:08:54.240409'),
(31, 'sessions', '0001_initial', '2024-05-18 14:08:54.271671');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_employee`
--

CREATE TABLE `employee_employee` (
  `id` bigint(20) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `employee_Image` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `issue_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_employee`
--

INSERT INTO `employee_employee` (`id`, `employee_name`, `employee_Image`, `position`, `phone`, `email`, `salary`, `issue_date`) VALUES
(1, 'Foos Abdullahi Ali', '/foos.jpg', 'admin', '0619745141', 'foos@gmail.com', '1000.00', '2024-05-18');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_reciept_payments`
--

CREATE TABLE `invoice_reciept_payments` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `issue_date` date NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `payment_method_id` bigint(20) NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material_material`
--

CREATE TABLE `material_material` (
  `id` bigint(20) NOT NULL,
  `material_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `sub_total` decimal(10,2) NOT NULL,
  `issue_date` date NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_expense`
--

CREATE TABLE `payment_expense` (
  `id` bigint(20) NOT NULL,
  `expense_description` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `expense_date` date NOT NULL,
  `payment_Type_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methode_payment_methode`
--

CREATE TABLE `payment_methode_payment_methode` (
  `id` bigint(20) NOT NULL,
  `pay_method_image` varchar(100) NOT NULL,
  `Py_method_name` varchar(100) NOT NULL,
  `issue_date` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_type_payment_type`
--

CREATE TABLE `payment_type_payment_type` (
  `id` bigint(20) NOT NULL,
  `Py_Type_name` varchar(100) NOT NULL,
  `issue_date` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects_projects`
--

CREATE TABLE `projects_projects` (
  `id` bigint(20) NOT NULL,
  `project_No` varchar(100) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `Agreements` varchar(10000) NOT NULL,
  `budget` double NOT NULL,
  `BudgetRemain` double NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `issue_date` date NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `design_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role_role`
--

CREATE TABLE `role_role` (
  `id` bigint(20) NOT NULL,
  `Role_name` varchar(100) NOT NULL,
  `issue_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_role`
--

INSERT INTO `role_role` (`id`, `Role_name`, `issue_date`) VALUES
(1, 'Admin', '2024-05-18');

-- --------------------------------------------------------

--
-- Table structure for table `tasks_tasks`
--

CREATE TABLE `tasks_tasks` (
  `id` bigint(20) NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `task_image` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` varchar(100) NOT NULL,
  `issue_date` date NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_user`
--

CREATE TABLE `user_user` (
  `id` bigint(20) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `issue_date` date NOT NULL,
  `employee_id_id` bigint(20) NOT NULL,
  `role_id_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_user`
--

INSERT INTO `user_user` (`id`, `UserName`, `Password`, `issue_date`, `employee_id_id`, `role_id_id`) VALUES
(1, 'Foos', 'foos123', '2024-05-18', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `client_client`
--
ALTER TABLE `client_client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `Client_client_user_id_62bd75a7_fk_user_user_id` (`user_id`);

--
-- Indexes for table `companies_companies`
--
ALTER TABLE `companies_companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `design_design`
--
ALTER TABLE `design_design`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Design_design_user_id_7588cf62_fk_user_user_id` (`user_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `employee_employee`
--
ALTER TABLE `employee_employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `invoice_reciept_payments`
--
ALTER TABLE `invoice_reciept_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_reciept_payments_client_id_1aad8e32_fk_Client_client_id` (`client_id`),
  ADD KEY `invoice_reciept_paym_payment_method_id_13700977_fk_Payment_M` (`payment_method_id`),
  ADD KEY `invoice_reciept_paym_project_id_19a5342d_fk_Projects_` (`project_id`),
  ADD KEY `invoice_reciept_payments_user_id_8f5a128b_fk_user_user_id` (`user_id`);

--
-- Indexes for table `material_material`
--
ALTER TABLE `material_material`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Material_material_project_id_f4b82264_fk_Projects_projects_id` (`project_id`),
  ADD KEY `Material_material_user_id_9c1214ed_fk_user_user_id` (`user_id`);

--
-- Indexes for table `payment_expense`
--
ALTER TABLE `payment_expense`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_expense_payment_Type_id_fb5f5b05_fk_Payment_T` (`payment_Type_id`),
  ADD KEY `payment_expense_user_id_73713f07_fk_user_user_id` (`user_id`);

--
-- Indexes for table `payment_methode_payment_methode`
--
ALTER TABLE `payment_methode_payment_methode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Payment_Methode_payment_methode_user_id_c5e5eb7a_fk_user_user_id` (`user_id`);

--
-- Indexes for table `payment_type_payment_type`
--
ALTER TABLE `payment_type_payment_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Payment_Type_payment_type_user_id_75a9eb59_fk_user_user_id` (`user_id`);

--
-- Indexes for table `projects_projects`
--
ALTER TABLE `projects_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Projects_projects_client_id_a7ca4cdd_fk_Client_client_id` (`client_id`),
  ADD KEY `Projects_projects_design_id_1c14af75_fk_Design_design_id` (`design_id`),
  ADD KEY `Projects_projects_user_id_ba0d36b1_fk_user_user_id` (`user_id`);

--
-- Indexes for table `role_role`
--
ALTER TABLE `role_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks_tasks`
--
ALTER TABLE `tasks_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tasks_tasks_project_id_b9045079_fk_Projects_projects_id` (`project_id`),
  ADD KEY `Tasks_tasks_user_id_0c3a4d4d_fk_user_user_id` (`user_id`);

--
-- Indexes for table `user_user`
--
ALTER TABLE `user_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_user_employee_id_id_13b55493_fk_Employee_employee_id` (`employee_id_id`),
  ADD KEY `user_user_role_id_id_ca034f99_fk_Role_role_id` (`role_id_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_client`
--
ALTER TABLE `client_client`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies_companies`
--
ALTER TABLE `companies_companies`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `design_design`
--
ALTER TABLE `design_design`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `employee_employee`
--
ALTER TABLE `employee_employee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoice_reciept_payments`
--
ALTER TABLE `invoice_reciept_payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material_material`
--
ALTER TABLE `material_material`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_expense`
--
ALTER TABLE `payment_expense`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_methode_payment_methode`
--
ALTER TABLE `payment_methode_payment_methode`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_type_payment_type`
--
ALTER TABLE `payment_type_payment_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects_projects`
--
ALTER TABLE `projects_projects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role_role`
--
ALTER TABLE `role_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tasks_tasks`
--
ALTER TABLE `tasks_tasks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_user`
--
ALTER TABLE `user_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `client_client`
--
ALTER TABLE `client_client`
  ADD CONSTRAINT `Client_client_user_id_62bd75a7_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `design_design`
--
ALTER TABLE `design_design`
  ADD CONSTRAINT `Design_design_user_id_7588cf62_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `invoice_reciept_payments`
--
ALTER TABLE `invoice_reciept_payments`
  ADD CONSTRAINT `invoice_reciept_paym_payment_method_id_13700977_fk_Payment_M` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methode_payment_methode` (`id`),
  ADD CONSTRAINT `invoice_reciept_paym_project_id_19a5342d_fk_Projects_` FOREIGN KEY (`project_id`) REFERENCES `projects_projects` (`id`),
  ADD CONSTRAINT `invoice_reciept_payments_client_id_1aad8e32_fk_Client_client_id` FOREIGN KEY (`client_id`) REFERENCES `client_client` (`id`),
  ADD CONSTRAINT `invoice_reciept_payments_user_id_8f5a128b_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `material_material`
--
ALTER TABLE `material_material`
  ADD CONSTRAINT `Material_material_project_id_f4b82264_fk_Projects_projects_id` FOREIGN KEY (`project_id`) REFERENCES `projects_projects` (`id`),
  ADD CONSTRAINT `Material_material_user_id_9c1214ed_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `payment_expense`
--
ALTER TABLE `payment_expense`
  ADD CONSTRAINT `payment_expense_payment_Type_id_fb5f5b05_fk_Payment_T` FOREIGN KEY (`payment_Type_id`) REFERENCES `payment_type_payment_type` (`id`),
  ADD CONSTRAINT `payment_expense_user_id_73713f07_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `payment_methode_payment_methode`
--
ALTER TABLE `payment_methode_payment_methode`
  ADD CONSTRAINT `Payment_Methode_payment_methode_user_id_c5e5eb7a_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `payment_type_payment_type`
--
ALTER TABLE `payment_type_payment_type`
  ADD CONSTRAINT `Payment_Type_payment_type_user_id_75a9eb59_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `projects_projects`
--
ALTER TABLE `projects_projects`
  ADD CONSTRAINT `Projects_projects_client_id_a7ca4cdd_fk_Client_client_id` FOREIGN KEY (`client_id`) REFERENCES `client_client` (`id`),
  ADD CONSTRAINT `Projects_projects_design_id_1c14af75_fk_Design_design_id` FOREIGN KEY (`design_id`) REFERENCES `design_design` (`id`),
  ADD CONSTRAINT `Projects_projects_user_id_ba0d36b1_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `tasks_tasks`
--
ALTER TABLE `tasks_tasks`
  ADD CONSTRAINT `Tasks_tasks_project_id_b9045079_fk_Projects_projects_id` FOREIGN KEY (`project_id`) REFERENCES `projects_projects` (`id`),
  ADD CONSTRAINT `Tasks_tasks_user_id_0c3a4d4d_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Constraints for table `user_user`
--
ALTER TABLE `user_user`
  ADD CONSTRAINT `user_user_employee_id_id_13b55493_fk_Employee_employee_id` FOREIGN KEY (`employee_id_id`) REFERENCES `employee_employee` (`id`),
  ADD CONSTRAINT `user_user_role_id_id_ca034f99_fk_Role_role_id` FOREIGN KEY (`role_id_id`) REFERENCES `role_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
