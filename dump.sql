--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: available_times; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.available_times (
    id integer NOT NULL,
    "time" timestamp with time zone NOT NULL,
    doctor_id integer NOT NULL,
    available boolean DEFAULT true NOT NULL,
    specialty_id integer NOT NULL
);


--
-- Name: available_times_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.available_times_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: available_times_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.available_times_id_seq OWNED BY public.available_times.id;


--
-- Name: doctors_specialty; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctors_specialty (
    id integer NOT NULL,
    user_id integer NOT NULL,
    specialty_id integer NOT NULL
);


--
-- Name: doctors_specialty_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctors_specialty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctors_specialty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctors_specialty_id_seq OWNED BY public.doctors_specialty.id;


--
-- Name: scheduling; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scheduling (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    available_times_id integer NOT NULL,
    doctors_confirmation boolean DEFAULT true NOT NULL,
    finished boolean DEFAULT false NOT NULL
);


--
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.scheduling.id;


--
-- Name: specialties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.specialties_id_seq OWNED BY public.specialties.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    cpf character varying(11) NOT NULL,
    telephone character varying(11) NOT NULL,
    crm character varying(11) DEFAULT 'null'::character varying,
    is_doctor boolean DEFAULT false NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    house_number text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: available_times id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times ALTER COLUMN id SET DEFAULT nextval('public.available_times_id_seq'::regclass);


--
-- Name: doctors_specialty id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors_specialty ALTER COLUMN id SET DEFAULT nextval('public.doctors_specialty_id_seq'::regclass);


--
-- Name: scheduling id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scheduling ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialties_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: available_times; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.available_times VALUES (21, '2023-04-04 14:00:00-03', 4, true, 5);
INSERT INTO public.available_times VALUES (22, '2023-04-04 15:00:00-03', 4, true, 6);
INSERT INTO public.available_times VALUES (23, '2023-04-04 16:00:00-03', 4, true, 6);
INSERT INTO public.available_times VALUES (26, '2023-04-04 12:00:00-03', 7, true, 40);
INSERT INTO public.available_times VALUES (27, '2023-04-04 13:00:00-03', 7, true, 40);
INSERT INTO public.available_times VALUES (28, '2023-04-04 14:00:00-03', 7, true, 40);
INSERT INTO public.available_times VALUES (30, '2023-04-04 16:00:00-03', 7, true, 41);
INSERT INTO public.available_times VALUES (33, '2023-04-04 13:00:00-03', 6, true, 7);
INSERT INTO public.available_times VALUES (36, '2023-04-04 16:00:00-03', 6, true, 8);
INSERT INTO public.available_times VALUES (18, '2023-04-04 11:00:00-03', 4, false, 5);
INSERT INTO public.available_times VALUES (19, '2023-04-04 12:00:00-03', 4, false, 5);
INSERT INTO public.available_times VALUES (31, '2023-04-04 11:00:00-03', 6, false, 7);
INSERT INTO public.available_times VALUES (35, '2023-04-04 15:00:00-03', 6, false, 8);
INSERT INTO public.available_times VALUES (25, '2023-04-04 11:00:00-03', 7, false, 40);
INSERT INTO public.available_times VALUES (29, '2023-04-04 15:00:00-03', 7, false, 41);
INSERT INTO public.available_times VALUES (32, '2023-04-04 12:00:00-03', 6, false, 7);
INSERT INTO public.available_times VALUES (34, '2023-04-04 14:00:00-03', 6, false, 7);
INSERT INTO public.available_times VALUES (20, '2023-04-04 13:00:00-03', 4, false, 5);
INSERT INTO public.available_times VALUES (24, '2023-04-04 17:00:00-03', 4, false, 6);


--
-- Data for Name: doctors_specialty; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctors_specialty VALUES (1, 1, 1);
INSERT INTO public.doctors_specialty VALUES (2, 1, 2);
INSERT INTO public.doctors_specialty VALUES (3, 5, 3);
INSERT INTO public.doctors_specialty VALUES (4, 5, 4);
INSERT INTO public.doctors_specialty VALUES (5, 4, 7);
INSERT INTO public.doctors_specialty VALUES (6, 4, 8);
INSERT INTO public.doctors_specialty VALUES (7, 6, 9);
INSERT INTO public.doctors_specialty VALUES (8, 6, 10);
INSERT INTO public.doctors_specialty VALUES (40, 7, 6);
INSERT INTO public.doctors_specialty VALUES (41, 7, 42);


--
-- Data for Name: scheduling; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.scheduling VALUES (3, 3, 31, true, false);
INSERT INTO public.scheduling VALUES (4, 3, 35, true, false);
INSERT INTO public.scheduling VALUES (7, 9, 32, true, false);
INSERT INTO public.scheduling VALUES (8, 9, 34, true, false);
INSERT INTO public.scheduling VALUES (10, 9, 24, true, false);
INSERT INTO public.scheduling VALUES (5, 3, 25, false, true);
INSERT INTO public.scheduling VALUES (6, 3, 29, false, true);
INSERT INTO public.scheduling VALUES (1, 3, 18, true, false);
INSERT INTO public.scheduling VALUES (2, 3, 19, true, false);
INSERT INTO public.scheduling VALUES (9, 9, 20, true, true);


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialties VALUES (1, 'Neurologista');
INSERT INTO public.specialties VALUES (2, 'Otorrinolaringologista');
INSERT INTO public.specialties VALUES (3, 'Ortopedista');
INSERT INTO public.specialties VALUES (4, 'Clinico Geral');
INSERT INTO public.specialties VALUES (5, 'Cirurgiao');
INSERT INTO public.specialties VALUES (6, 'Pediatra');
INSERT INTO public.specialties VALUES (7, 'Psiquiatra');
INSERT INTO public.specialties VALUES (8, 'Matuto');
INSERT INTO public.specialties VALUES (9, 'Arrudo');
INSERT INTO public.specialties VALUES (10, 'Mamchudo');
INSERT INTO public.specialties VALUES (42, 'Ginecologista');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'alfredo', 'alfredo@gmail.com', '$2b$10$eouUuD/eo/141SXIiovDMu8OC7TsUvktDOuvjiZm3NwhXb8z4zuNu', '11111111113', '21999866488', '22222222223', true, 'Rua Alfred', 'Do Batman', 'Arkam state', 'Caverna 1');
INSERT INTO public.users VALUES (3, 'Victor', 'victor@gmail.com', '$2b$10$DVXiW56AeaRLjUPm.arSy.bz/eIvIpDUH4JiX1n9xJiQ64F6ZW6mS', '11111111111', '21999866488', NULL, false, 'Rua marrom', 'Do Batman', 'Arkam state', 'Caverna 1');
INSERT INTO public.users VALUES (4, 'Allan', 'allan@gmail.com', '$2b$10$nsT/kkaPiVsyAtSCZQMda..AXGXwH/E4JUkIm8CNSQEJin.n/e88y', '11111111112', '21999866488', '11111111111', true, 'Rua marrom', 'Do Batman', 'Arkam state', 'Caverna 1');
INSERT INTO public.users VALUES (5, 'Roberto', 'roberto@gmail.com', '$2b$10$MGqdAXLPbgGooBVc7nwSU.DHMRS7CYYC2MtApedoKfYndwsQ.4L6e', '11111111114', '21999866488', '11111111112', true, 'Rua marrom', 'Do Batman', 'Arkam state', 'Caverna 1');
INSERT INTO public.users VALUES (6, 'Roberval', 'roberval@gmail.com', '$2b$10$jDwDp8iuz8n9aVbHNBS4jeqlBx0gyKj9.nxCFQ3TYvd7R0qlySV6e', '11111111115', '21999866488', '11111111114', true, 'Rua marrom', 'Do Batman', 'Arkam state', 'Caverna 1');
INSERT INTO public.users VALUES (7, 'Yasmin', 'yasmin@gmail.com', '$2b$10$qEHQdsmA.ScuVve7g2xkEulKDnzIo0K0hR280tnEE7gavtlFblILq', '11111111116', '21999866488', '11111111115', true, 'Rua marrom', 'Do Batman', 'Arkam state', 'Caverna 1');
INSERT INTO public.users VALUES (8, 'jose', 'jose@gmail.com', '$2b$10$tXqZ0HtPL16IxPv.NpfVt.oXEOicadpBpLy5GZT/LVwmyFjdqNTR.', '11111111117', '21999866488', '11111111116', true, 'Rua Florianopolis', 'Duque de Caxias', 'Rio de Janeiro', '132');
INSERT INTO public.users VALUES (9, 'Martin', 'martin@gmail.com', '$2b$10$55vEDS.lc72GLiAGUJEA7uMhtNZnHbzJGHt4kKpZsUS9ep/sOEIjG', '11111111118', '21999866488', NULL, false, 'Rua Florianopolis', 'Duque de Caxias', 'Rio de Janeiro', '132');


--
-- Name: available_times_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.available_times_id_seq', 36, true);


--
-- Name: doctors_specialty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctors_specialty_id_seq', 41, true);


--
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.schedules_id_seq', 10, true);


--
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialties_id_seq', 42, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: available_times available_times_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times
    ADD CONSTRAINT available_times_pk PRIMARY KEY (id);


--
-- Name: doctors_specialty doctors_specialty_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors_specialty
    ADD CONSTRAINT doctors_specialty_pk PRIMARY KEY (id);


--
-- Name: scheduling schedules_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scheduling
    ADD CONSTRAINT schedules_pk PRIMARY KEY (id);


--
-- Name: specialties specialties_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_name_key UNIQUE (name);


--
-- Name: specialties specialties_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pk PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: available_times available_times_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times
    ADD CONSTRAINT available_times_fk0 FOREIGN KEY (doctor_id) REFERENCES public.users(id);


--
-- Name: available_times available_times_specialty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times
    ADD CONSTRAINT available_times_specialty_id_fkey FOREIGN KEY (specialty_id) REFERENCES public.doctors_specialty(id);


--
-- Name: doctors_specialty doctors_specialty_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors_specialty
    ADD CONSTRAINT doctors_specialty_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: doctors_specialty doctors_specialty_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors_specialty
    ADD CONSTRAINT doctors_specialty_fk1 FOREIGN KEY (specialty_id) REFERENCES public.specialties(id);


--
-- Name: scheduling schedules_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scheduling
    ADD CONSTRAINT schedules_fk0 FOREIGN KEY (patient_id) REFERENCES public.users(id);


--
-- Name: scheduling schedules_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scheduling
    ADD CONSTRAINT schedules_fk1 FOREIGN KEY (available_times_id) REFERENCES public.available_times(id);


--
-- PostgreSQL database dump complete
--

