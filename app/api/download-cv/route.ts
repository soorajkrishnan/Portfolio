import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'txt';

  const resumeText = `SOORAJ KRISHNAN V S
Cloud Data Engineer | Kochi, India
Phone: +91 6282363736
Email: soorajkrishnanvs@gmail.com
LinkedIn: https://linkedin.com/in/soorajkrishnanvs

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Data Engineer with 4 years of hands-on experience architecting end-to-end ETL/ELT data pipelines and automating complex workflows across Azure and AWS cloud ecosystems. Proficient in Azure Data Explorer pipeline design, Spark-based processing, and Medallion Lakehouse architecture. Delivered a 60% reduction in API development time through intelligent automation frameworks. Databricks certified, with expertise in real-time ingestion, data warehousing, cloud-native infrastructure, and scalable system design.

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================
Tata Consultancy Services — Kochi, India
Cloud Data Engineer | August 2021 – Present

- Architected Medallion Lakehouse pipelines in Azure Data Explorer powered by Azure Event Hubs and Debezium, providing real-time operational telemetry through ADX & Grafana dashboards.
- Engineered a dynamic REST API generator utilizing FastAPI and Pydantic, automating standard GET endpoints and cutting development lifecycle from 5 days to 2 days (60% time savings).
- Led AWS document intelligence platform development leveraging Step Functions, Textract, Comprehend, and Augmented AI (A2I), achieving 80%+ extraction precision on complex unstructured PDF documents.
- Built automated data ingestion pipelines with BeautifulSoup and pdfplumber to convert unstructured stakeholder reports into indexed PostgreSQL databases, replacing manual web research.
- Designed topic modeling systems using Unsupervised Machine Learning and Semantic Analysis (Gensim, SpaCy) on large text datasets, automating trend discovery reports and visual dashboards.

================================================================================
EDUCATION
================================================================================
Master of Science in Computer Science (2019 – 2021)
Mahatma Gandhi University, Kottayam, India

Bachelor of Science in Computer Science (2016 – 2019)
Mahatma Gandhi University, Kottayam, India

================================================================================
TECHNICAL SKILLS
================================================================================
Programming: Python, SQL, KQL (Kusto Query Language)
Data Engineering: ETL/ELT Pipeline Development, Medallion Architecture, Stream & Batch Processing
Big Data Platforms: Apache Spark, Databricks, Azure Data Explorer (ADX)
Cloud & DevOps: Microsoft Azure (Event Hub, ADX), AWS (Step Functions, Textract, Comprehend), Terraform, Git, CI/CD
Frameworks & Libraries: FastAPI, Pydantic, Flask, Pandas, Gensim, SpaCy, BeautifulSoup
Database Systems: PostgreSQL, Azure Data Explorer, Delta Lake, Cosmos DB

================================================================================
CERTIFICATIONS
================================================================================
- Databricks Certified Data Engineer Associate (Databricks, 2026)
- AWS Certified AI Practitioner (Amazon Web Services, 2026)
- Microsoft Certified: Azure AI Fundamentals (Microsoft, 2024)
`;

  return new NextResponse(resumeText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Sooraj_Krishnan_VS_Resume.txt"',
    },
  });
}
