const outputs = [
  "Карточка тендера",
  "Карточка решения",
  "Реестр требований",
  "Таблица позиций",
  "Запрос поставщику",
  "Сравнение КП",
  "Расчет рентабельности",
  "Задачи и дедлайны",
];

const stack = [
  ["Web", "Next.js, TypeScript, React"],
  ["API", "Python, FastAPI, Pydantic"],
  ["Data", "PostgreSQL + pgvector"],
  ["Jobs", "Redis + Celery/RQ"],
  ["Files", "S3/MinIO"],
  ["AI", "структурный разбор документов и КП"],
];

export default function Home() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <p className="eyebrow">ASTS MVP blueprint</p>
          <h1>AI-диспетчер тендерного отдела</h1>
          <p className="lead">
            От разбора закупочной документации до сбора КП, сравнения цен,
            расчета маржи и контроля задач.
          </p>
        </div>
        <div className="status">
          <span>Локальный проект создан</span>
          <strong>Blueprint</strong>
        </div>
      </section>

      <section className="grid two">
        <div className="panel">
          <h2>На чем пишем</h2>
          <div className="rows">
            {stack.map(([name, value]) => (
              <div className="row" key={name}>
                <span>{name}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Как выдаем данные</h2>
          <div className="chips">
            {outputs.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Первый продаваемый MVP</h2>
        <ol className="steps">
          <li>Импорт тендера из XLSX или создание по ссылке.</li>
          <li>Загрузка PDF/DOCX/XLSX документации.</li>
          <li>AI-разбор требований, сроков, рисков и позиций.</li>
          <li>Решение: участвовать, отказаться или проверить вручную.</li>
          <li>Сбор КП поставщиков по публичной ссылке.</li>
          <li>Сравнение цен и расчет предварительной рентабельности.</li>
        </ol>
      </section>
    </main>
  );
}
