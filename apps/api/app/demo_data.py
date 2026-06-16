from app.schemas import DocumentArtifact, SourceEvidence, TaskItem, TenderSummary

EIS_EVIDENCE = SourceEvidence(
    source_kind="eis",
    source_url="https://zakupki.gov.ru/epz/order/notice/ea20/view/common-info.html?regNumber=0373100042626000001",
    raw_artifact_id="raw-eis-0373100042626000001",
    checksum_sha256="a" * 64,
    freshness="fresh",
)

FNS_EVIDENCE = SourceEvidence(
    source_kind="fns",
    source_url="https://egrul.nalog.ru/",
    raw_artifact_id="raw-fns-customer-profile-7700000000",
    checksum_sha256="b" * 64,
    freshness="manual_review",
)

ETP_EVIDENCE = SourceEvidence(
    source_kind="etp",
    source_url="https://www.rts-tender.ru/",
    raw_artifact_id="raw-etp-procedure-room-0373100042626000001",
    checksum_sha256="c" * 64,
    freshness="fresh",
)

DEMO_TENDERS = [
    TenderSummary(
        tender_id="0373100042626000001",
        title="Поставка серверного оборудования для регионального центра",
        customer_name="ГБУ Региональный центр цифровой инфраструктуры",
        source=EIS_EVIDENCE,
        nmck_rub=18_450_000,
        region="Москва",
        deadline_at="2026-06-24T10:00:00+03:00",
        funnel="pre_win",
        stage="qualification",
        ai_confidence=0.82,
    ),
    TenderSummary(
        tender_id="exec-2026-0007",
        title="Исполнение контракта: поставка и ввод в эксплуатацию",
        customer_name="ГБУ Региональный центр цифровой инфраструктуры",
        source=ETP_EVIDENCE,
        nmck_rub=18_450_000,
        region="Москва",
        deadline_at="2026-07-15T18:00:00+03:00",
        funnel="execution",
        stage="fulfillment",
        ai_confidence=0.74,
    ),
]

DEMO_DOCUMENTS = [
    DocumentArtifact(
        document_id="doc-0373100042626000001-tz",
        tender_id="0373100042626000001",
        title="Техническое задание",
        status="parsed",
        source=EIS_EVIDENCE,
        storage_path="raw/eis/0373100042626000001/specification.pdf",
        mime_type="application/pdf",
    ),
    DocumentArtifact(
        document_id="doc-0373100042626000001-customer",
        tender_id="0373100042626000001",
        title="Проверка заказчика по ФНС",
        status="reviewed",
        source=FNS_EVIDENCE,
        storage_path="raw/fns/7700000000/egrul.json",
        mime_type="application/json",
    ),
]

DEMO_TASKS = [
    TaskItem(
        task_id="task-qualification-001",
        tender_id="0373100042626000001",
        title="Подтвердить соответствие требованиям и допускам",
        owner_role="tender_manager",
        priority="warning",
        status="open",
        due_at="2026-06-18T18:00:00+03:00",
        requires_human_approval=True,
    ),
    TaskItem(
        task_id="task-execution-007",
        tender_id="exec-2026-0007",
        title="Сверить график поставки с пост-победной воронкой",
        owner_role="execution_owner",
        priority="critical",
        status="blocked",
        due_at="2026-06-17T12:00:00+03:00",
        requires_human_approval=True,
    ),
]
