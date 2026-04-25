

-- Funcções que respondem à Ficha Base de Dados Escola D’ELITE
-- Ex.1 Obter uma listagem de alunos e professores com endereços de email e numeros de telefone incorretos
EXEC Ex_Contactos_VerificarInvalidos

-- Ex.2 Obter uma listagem dos alunos que tenham irmãos inscritos
EXEC Ex_Alunos_ObterIrmaos

-- Ex.3 Obter uma listagem do quadro de honra dos alunos, para um dado ano
EXEC Ex_Alunos_ObterQuadroDeHonra 2000

-- Ex.4 Obter uma listagem dos N professores mais antigos em funções
EXEC Ex_Professores_ObterMaisAntigos 2

-- Ex.5 Mostrar o numero de alunos por ano e curso
EXEC Ex_Alunos_ObterPorAnoECurso

-- Ex.6 Manter um histórico com o registo de aprovação/reprovação dos alunos, para cada ano
EXEC Ex_Alunos_ObterHistoricoNotas

-- Ex.7 Efetuar o registo de um novo aluno
EXEC Ex_Aluno_Inserir @NIF = '222333444', @FirstName = 'Jose', @LastNAme = 'Silva', @DOB = '2010-08-21'

-- Ex.8 Efetuar o registo de um novo professor
EXEC Ex_Professor_Inserir @NIF = '333444555', @FirstName = 'Maria', @LastNAme = 'Grilo', @DOB = '1980-08-21'

-- Ex.9 Efetuar a cessação de funções de um professor
EXEC Ex_Professor_Cessar 2

-- Ex.10 Efetuar a transferência de um aluno para outra escola
EXEC Ex_Aluno_Transferir 2

-- Ex.11 Proceder ao registo automático dos dados para o novo ano escolar
EXEC Ex_AnoLetivo_CriarComDependencias @Year = 2001
