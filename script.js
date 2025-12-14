// Data Storage
let questions = [];
// Example structure: { id: 1, text: "El sol es una estrella.", isTrue: true, explanation: "..." }

let currentQuestionIndex = 0;
let score = { correct: 0, incorrect: 0 };
let history = [];

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    history: document.getElementById('history-screen')
};

const ui = {
    progressFill: document.getElementById('progress-fill'),
    correctCount: document.getElementById('correct-count'),
    incorrectCount: document.getElementById('incorrect-count'),
    currentQ: document.getElementById('current-q'),
    totalQ: document.getElementById('total-q'),
    questionText: document.getElementById('question-text'),
    trueBtn: document.getElementById('true-btn'),
    falseBtn: document.getElementById('false-btn'),
    feedbackOverlay: document.getElementById('feedback-overlay'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackMsg: document.getElementById('feedback-msg'),
    finalScore: document.getElementById('final-score'),
    finalCorrect: document.getElementById('final-correct'),
    finalTotal: document.getElementById('final-total'),
    historyList: document.getElementById('history-list')
};

// Initialization
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);
document.getElementById('review-btn').addEventListener('click', showHistory);
document.getElementById('back-results-btn').addEventListener('click', () => switchScreen('result'));

ui.trueBtn.addEventListener('click', () => handleAnswer(true));
ui.falseBtn.addEventListener('click', () => handleAnswer(false));

// Load data function (will be populated with user data later)
function loadQuestions() {
    return [
        { text: "Los requerimientos no funcionales (NFR) se enfocan en cómo debe comportarse el sistema bajo distintas condiciones, a diferencia de los requerimientos funcionales que describen qué debe hacer el sistema.", isTrue: true, explanation: "" },
        { text: "Los requerimientos no funcionales constituyen una guía esencial para garantizar estándares de calidad, rendimiento y confiabilidad en sistemas distribuidos.", isTrue: true, explanation: "" },
        { text: "Los balanceadores de carga son mecanismos arquitectónicos que distribuyen peticiones entre múltiples instancias de servicio para cumplir con atributos de calidad específicos.", isTrue: true, explanation: "" },
        { text: "El atributo de calidad disponibilidad implica que el sistema permanece accesible incluso si una instancia falla, ya que el balanceador redirige el tráfico hacia nodos activos.", isTrue: true, explanation: "" },
        { text: "El atributo de calidad escalabilidad permite añadir o retirar instancias sin afectar la continuidad del servicio durante picos de demanda.", isTrue: true, explanation: "" },
        { text: "El atributo de calidad rendimiento se logra cuando el balanceador distribuye la carga eficientemente para reducir latencias y tiempos de respuesta del sistema.", isTrue: true, explanation: "" },
        { text: "La tolerancia a fallos ofrece resiliencia al sistema al detectar caídas de servidores y aislarlos dinámicamente del tráfico.", isTrue: true, explanation: "" },
        { text: "La mantenibilidad se ve favorecida porque el balanceador facilita actualizaciones progresivas (rolling updates) sin interrumpir el servicio a los usuarios.", isTrue: true, explanation: "" },
        { text: "Los balanceadores de carga son considerados una táctica arquitectónica fundamental que satisface atributos de calidad relacionados con disponibilidad y rendimiento, según Bass, Clements y Kazman (2022).", isTrue: true, explanation: "" },
        { text: "El uso de balanceadores de carga se fundamenta en decisiones de arquitectura orientadas a garantizar que el sistema soporte el crecimiento de usuarios y maneje fallos parciales.", isTrue: true, explanation: "" },
        { text: "En un contexto de e-commerce, un requerimiento no funcional como “El sistema deberá soportar 10,000 usuarios concurrentes sin degradar el tiempo de respuesta promedio por encima de 200 ms” evidencia una necesidad de diseño específica.", isTrue: true, explanation: "" },
        { text: "Dicho requerimiento no funcional se traduce en la necesidad de implementar un balanceador de carga que distribuya las solicitudes entre múltiples servidores.", isTrue: true, explanation: "" },
        { text: "El atributo de escalabilidad se operacionaliza mediante la implementación de esta táctica arquitectónica de balanceo de carga.", isTrue: true, explanation: "" },
        { text: "La decisión de utilizar un balanceador de carga se justifica cuando los requerimientos no funcionales no pueden cumplirse con una única instancia del servicio.", isTrue: true, explanation: "" },
        { text: "Los escenarios de alta concurrencia, como aplicaciones con picos de tráfico (plataformas de streaming o portales educativos masivos), requieren el uso de balanceadores de carga.", isTrue: true, explanation: "" },
        { text: "Los sistemas que deben garantizar disponibilidad 24/7, como los servicios financieros o de salud, justifican el uso de balanceadores de carga.", isTrue: true, explanation: "" },
        { text: "Los despliegues continuos hacen necesario el uso de balanceadores de carga cuando se necesita actualizar servicios sin interrumpir las operaciones del negocio.", isTrue: true, explanation: "" },
        { text: "La tolerancia a fallos es un escenario crítico en infraestructuras distribuidas en múltiples zonas de disponibilidad o regiones de nube.", isTrue: true, explanation: "" },
        { text: "La optimización de costos puede lograrse mediante balanceo inteligente que aprovecha instancias heterogéneas y ajusta el consumo según la demanda.", isTrue: true, explanation: "" },
        { text: "Herramientas como Ansible permiten traducir los requerimientos no funcionales (NFR) en configuraciones repetibles y auditables.", isTrue: true, explanation: "" },
        { text: "El nivel de automatización que ofrece Ansible fortalece la disponibilidad, la escalabilidad y contribuye a la mantenibilidad del sistema.", isTrue: true, explanation: "" },
        { text: "Ansible tiene la capacidad de realizar la instalación automática de software como Nginx o HAProxy en los servidores objetivo.", isTrue: true, explanation: "" },
        { text: "Ansible permite la configuración de upstreams para distribuir tráfico entre servidores web de manera eficiente.", isTrue: true, explanation: "" },
        { text: "Ansible incorpora health checks que garantizan la tolerancia a fallos del sistema.", isTrue: true, explanation: "" },
        { text: "La automatización mediante Ansible contribuye a la reducción de errores al eliminar errores humanos en la configuración.", isTrue: true, explanation: "" },
        { text: "La automatización garantiza el cumplimiento con estándares definidos dentro del sistema.", isTrue: true, explanation: "" },
        { text: "•La automatización permite mantener configuraciones consistentes en todos los entornos.", isTrue: true, explanation: "" },
        { text: "El escalamiento multi-cloud mediante automatización permite definir reglas de escalamiento consistentes.", isTrue: true, explanation: "" },
        { text: "La automatización facilita la unificación de entornos multi-cloud.", isTrue: true, explanation: "" },
        { text: "La gestión centralizada es un beneficio directo del escalamiento multi-cloud soportado por automatización.", isTrue: true, explanation: "" },
        { text: "El impacto de la automatización en la disponibilidad se refleja en un tiempo de actividad mejorado del 99.9%.", isTrue: true, explanation: "" },
        { text: "La automatización contribuye a una reducción de latencia del 50%, mejorando los tiempos de respuesta del sistema.", isTrue: true, explanation: "" },
        { text: "La automatización permite una escalabilidad de hasta 10 veces la capacidad de crecimiento del sistema.", isTrue: true, explanation: "" },
        { text: "En la industria de servicios financieros, Ansible y los balanceadores se utilizan en sistemas de trading que requieren disponibilidad 24/7 y latencia ultra-baja.", isTrue: true, explanation: "" },
        { text: "En el sector de educación online, las plataformas educativas masivas utilizan estas soluciones para manejar picos de tráfico durante exámenes.", isTrue: true, explanation: "" },
        { text: "En la industria del streaming, los servicios de video emplean estas arquitecturas para distribuir contenido a millones de usuarios simultáneamente.", isTrue: true, explanation: "" },
        { text: "En la arquitectura de referencia, el balanceador recibe y distribuye las solicitudes entrantes.", isTrue: true, explanation: "" },
        { text: "La distribución del tráfico en la arquitectura de referencia se realiza mediante algoritmos como round-robin y least-connections.", isTrue: true, explanation: "" },
        { text: "Los health checks en la arquitectura de referencia verifican la salud de cada servidor backend.", isTrue: true, explanation: "" },
        { text: "La arquitectura contempla tres servidores web activos y replicados.", isTrue: true, explanation: "" },
        { text: "El mecanismo de failover redirige automáticamente el tráfico si uno de los servidores falla.", isTrue: true, explanation: "" },
        { text: "Esta arquitectura demuestra cómo los balanceadores implementan múltiples atributos de calidad de manera simultánea.", isTrue: true, explanation: "" },
        { text: "El paso inicial para llevar la teoría a la práctica consiste en identificar los requerimientos no funcionales mediante el análisis de los NFR del sistema.", isTrue: true, explanation: "" },
        { text: "El segundo paso consiste en seleccionar la táctica arquitectónica, eligiendo el balanceador como solución.", isTrue: true, explanation: "" },
        { text: "El tercer paso implica implementar la solución utilizando Infrastructure as Code (IaC) mediante Ansible para automatizar la configuración.", isTrue: true, explanation: "" },
        { text: "El último paso consiste en validar los atributos de calidad verificando el cumplimiento de los requerimientos no funcionales.", isTrue: true, explanation: "" },
        { text: "Los balanceadores de carga materializan una decisión arquitectónica basada en requerimientos no funcionales (NFR) y en atributos de calidad específicos.", isTrue: true, explanation: "" },
        { text: "La automatización esencial mediante herramientas como Ansible simplifica la configuración de la infraestructura y garantiza el cumplimiento de estándares definidos.", isTrue: true, explanation: "" },
        { text: "La combinación de balanceadores de carga y automatización cierra la brecha entre la teoría arquitectónica y la práctica de Infrastructure as Code (IaC).", isTrue: true, explanation: "" },
        { text: "Los balanceadores de carga no son solo un componente técnico, sino una materialización de excelencia arquitectónica.", isTrue: true, explanation: "" },
        { text: "Los atributos de calidad se operacionalizan mediante tácticas arquitectónicas concretas, como el uso de balanceadores de carga.", isTrue: true, explanation: "" },
        { text: "La Infraestructura como Código (IaC) permite automatizar despliegues con rapidez y consistencia, pero después del despliegue surge la necesidad de verificar si todo funciona correctamente.", isTrue: true, explanation: "" },
        { text: "La monitorización consiste en una observación continua del sistema.", isTrue: true, explanation: "" },
        { text: "La monitorización rastrea métricas de infraestructura y aplicaciones como CPU, memoria, tráfico y latencia en series temporales.", isTrue: true, explanation: "" },
        { text: "La monitorización permite una detección proactiva, identificando anomalías y prediciendo problemas antes de que impacten a los usuarios.", isTrue: true, explanation: "" },
        { text: "La monitorización realiza análisis de patrones, utilizando datos históricos para identificar tendencias y optimizar recursos.", isTrue: true, explanation: "" },
        { text: "El logging recolecta y almacena registros detallados de eventos discretos como inicios de sesión, errores de conexión y transacciones completadas.", isTrue: true, explanation: "" },
        { text: "El logging captura qué pasó, cuándo ocurrió y por qué ocurrió, siendo invaluable para la depuración forense después de incidentes.", isTrue: true, explanation: "" },
        { text: "El monitoreo responde a la pregunta “¿Cómo se comporta el sistema ahora?”.", isTrue: true, explanation: "" },
        { text: "El monitoreo se basa en métricas numéricas en tiempo real.", isTrue: true, explanation: "" },
        { text: "El monitoreo tiene un enfoque proactivo y genera alertas ante condiciones anómalas.", isTrue: true, explanation: "" },
        { text: "El logging responde a la pregunta “¿Qué sucedió y cuándo?”.", isTrue: true, explanation: "" },
        { text: "El logging se basa en registros históricos de eventos.", isTrue: true, explanation: "" },
        { text: "El logging tiene un enfoque reactivo y se utiliza para el diagnóstico de causas específicas.", isTrue: true, explanation: "" },
        { text: "La monitorización y el logging son prácticas complementarias, ya que la monitorización alerta sobre el problema y los logs revelan la causa raíz.", isTrue: true, explanation: "" },
        { text: "La observabilidad se define como la combinación de métricas, logs y trazas distribuidas.", isTrue: true, explanation: "" },
        { text: "La observabilidad permite obtener una visión completa del estado interno de sistemas complejos.", isTrue: true, explanation: "" },
        { text: "En Infraestructura como Código (IaC), la observabilidad es esencial porque proporciona visibilidad en tiempo real mediante el monitoreo continuo de métricas clave.", isTrue: true, explanation: "" },
        { text: "La observabilidad facilita la detección proactiva de problemas incipientes antes de que afecten gravemente a los usuarios.", isTrue: true, explanation: "" },
        { text: "El uso de logs y métricas permite una resolución rápida de incidentes, reduciendo drásticamente el MTTR (tiempo medio de recuperación).", isTrue: true, explanation: "" },
        { text: "El análisis histórico de métricas y logs permite la mejora continua, informando decisiones de optimización y planificación de capacidad.", isTrue: true, explanation: "" },
        { text: "La observabilidad contribuye a una mejor experiencia del usuario, al no depender de reportes de clientes y permitir detectar y corregir problemas de forma proactiva.", isTrue: true, explanation: "" },
        { text: "El caso real “Antes vs Después” compara la respuesta ante incidentes cuando no existe observabilidad frente a cuando se implementa observabilidad.", isTrue: true, explanation: "" },
        { text: "En un escenario sin observabilidad, los usuarios reportan las fallas manualmente, incluso a horas críticas como las 3 AM.", isTrue: true, explanation: "" },
        { text: "Sin observabilidad, la respuesta ante incidentes implica una búsqueda manual en logs dispersos.", isTrue: true, explanation: "" },
        { text: "La ausencia de observabilidad provoca que se requieran horas para encontrar la causa del problema.", isTrue: true, explanation: "" },
        { text: "Sin observabilidad, el sistema permanece inestable durante un periodo prolongado.", isTrue: true, explanation: "" },
        { text: "La falta de observabilidad incrementa el riesgo de error humano durante la resolución de incidentes.", isTrue: true, explanation: "" },
        { text: "Con observabilidad implementada, una alerta automática detecta anomalías en el sistema.", isTrue: true, explanation: "" },
        { text: "La observabilidad permite que un dashboard muestre contexto inmediato del incidente.", isTrue: true, explanation: "" },
        { text: "Con observabilidad, los logs se encuentran centralizados y pueden filtrarse por tiempo.", isTrue: true, explanation: "" },
        { text: "La observabilidad facilita la identificación rápida de la causa raíz del problema.", isTrue: true, explanation: "" },
        { text: "Gracias a la observabilidad, la recuperación del sistema puede lograrse en minutos.", isTrue: true, explanation: "" },
        { text: "El enfoque de “Monitoreo como Código” adopta el principio de “Everything as Code”.", isTrue: true, explanation: "" },
        { text: "En el monitoreo como código, las métricas, alertas y logs se definen en archivos de configuración junto con la infraestructura.", isTrue: true, explanation: "" },
        { text: "El versionado es uno de los beneficios directos del monitoreo como código.", isTrue: true, explanation: "" },
        { text: "El monitoreo como código facilita la colaboración entre equipos.", isTrue: true, explanation: "" },
        { text: "La reproducibilidad es un beneficio del monitoreo como código.", isTrue: true, explanation: "" },
        { text: "El monitoreo como código garantiza consistencia entre entornos.", isTrue: true, explanation: "" },
        { text: "La adopción del monitoreo como código contribuye a la reducción de errores manuales.", isTrue: true, explanation: "" },
        { text: "La integración con IaC permite definir en código los componentes de observabilidad utilizando herramientas como Terraform o Ansible.", isTrue: true, explanation: "" },
        { text: "La integración con IaC permite aprovisionar automáticamente herramientas como Prometheus y Grafana junto con las aplicaciones.", isTrue: true, explanation: "" },
        { text: "La integración con IaC posibilita versionar cambios como reglas de alertas y dashboards en un repositorio.", isTrue: true, explanation: "" },
        { text: "La integración con IaC asegura despliegues consistentes, manteniendo el mismo setup en entornos de desarrollo, prueba y producción.", isTrue: true, explanation: "" },
        { text: "Prometheus es un sistema open source de métricas con una base de datos de series temporales.", isTrue: true, explanation: "" },
        { text: "Prometheus utiliza un modelo pull, es escalable y es ideal para entornos Kubernetes.", isTrue: true, explanation: "" },
        { text: "Grafana es una plataforma líder de visualización que ofrece dashboards interactivos conectados a múltiples fuentes de datos como Loki y Prometheus.", isTrue: true, explanation: "" },
        { text: "AWS CloudWatch es una solución nativa de AWS que proporciona métricas automáticas de servicios, alarmas y acciones automatizadas.", isTrue: true, explanation: "" },
        { text: "Prometheus recolecta métricas periódicamente mediante un modelo pull.", isTrue: true, explanation: "" },
        { text: "Prometheus almacena métricas con marcas de tiempo y etiquetas.", isTrue: true, explanation: "" },
        { text: "Prometheus incorpora service discovery para entornos dinámicos.", isTrue: true, explanation: "" },
        { text: "Prometheus utiliza exporters para recolectar métricas de sistemas populares.", isTrue: true, explanation: "" },
        { text: "Prometheus ofrece el lenguaje PromQL para realizar consultas sobre métricas.", isTrue: true, explanation: "" },
        { text: "Prometheus incluye Alertmanager para el envío de notificaciones.", isTrue: true, explanation: "" },
        { text: "Prometheus es un proyecto graduado de la Cloud Native Computing Foundation (CNCF) y es considerado un estándar de facto en Kubernetes.", isTrue: true, explanation: "" },
        { text: "Grafana se conecta a múltiples fuentes de datos como Prometheus, InfluxDB, ElasticSearch y CloudWatch.", isTrue: true, explanation: "" },
        { text: "Grafana permite crear dashboards interactivos con gráficos en tiempo real.", isTrue: true, explanation: "" },
        { text: "Grafana ofrece paneles configurables con consultas personalizadas.", isTrue: true, explanation: "" },
        { text: "Grafana actúa como un hub central de observabilidad para métricas, logs y trazas.", isTrue: true, explanation: "" },
        { text: "Datadog es una plataforma todo-en-uno que integra monitoreo de infraestructura, APM y logs.", isTrue: true, explanation: "" },
        { text: "Datadog ofrece más de 400 integraciones y permite la correlación de métricas, trazas y logs.", isTrue: true, explanation: "" },
        { text: "New Relic tiene un enfoque centrado en APM y experiencia de usuario.", isTrue: true, explanation: "" },
        { text: "New Relic proporciona end-to-end tracing, perfiles de aplicaciones y análisis unificado.", isTrue: true, explanation: "" },
        { text: "Una ventaja de las soluciones SaaS empresariales como Datadog y New Relic es que no requieren mantener infraestructura propia.", isTrue: true, explanation: "" },
        { text: "Una desventaja de estas soluciones SaaS empresariales es el costo por licenciamiento.", isTrue: true, explanation: "" },
        { text: "El costo por licenciamiento se identifica explícitamente como una desventaja en las soluciones SaaS empresariales.", isTrue: true, explanation: "" },
        { text: "ELK Stack está compuesto por Elasticsearch, Logstash y Kibana.", isTrue: true, explanation: "" },
        { text: "ELK Stack es una solución open source ampliamente difundida para logging.", isTrue: true, explanation: "" },
        { text: "ELK Stack permite centralizar logs, realizar búsquedas rápidas y crear visualizaciones potentes.", isTrue: true, explanation: "" },
        { text: "Grafana Loki es una alternativa ligera inspirada en Prometheus.", isTrue: true, explanation: "" },
        { text: "Grafana Loki indexa únicamente etiquetas y no el contenido completo de los logs.", isTrue: true, explanation: "" },
        { text: "Grafana Loki se integra de forma nativa y perfecta con Grafana.", isTrue: true, explanation: "" },
        { text: "CloudWatch Logs es un servicio nativo de AWS para centralizar logs.", isTrue: true, explanation: "" },
        { text: "CloudWatch Logs centraliza logs provenientes de servicios como EC2, Lambda y API Gateway.", isTrue: true, explanation: "" },
        { text: "CloudWatch Logs permite crear filtros de métricas para convertir patrones de logs en alertas.", isTrue: true, explanation: "" },
        { text: "Logstash y Beats recopilan y transportan logs desde diversas fuentes, procesándolos si es necesario.", isTrue: true, explanation: "" },
        { text: "Elasticsearch almacena logs en un clúster indexado que permite búsquedas muy rápidas a gran escala.", isTrue: true, explanation: "" },
        { text: "Kibana proporciona una interfaz web para consultar, filtrar y visualizar logs mediante gráficas y análisis.", isTrue: true, explanation: "" },
        { text: "ELK Stack permite buscar logs por texto, filtrar por campos y generar visualizaciones de frecuencia de eventos en segundos.", isTrue: true, explanation: "" },
        { text: "Grafana Loki adopta una filosofía similar a Prometheus aplicada al logging.", isTrue: true, explanation: "" },
        { text: "Grafana Loki indexa solo etiquetas y no el contenido completo de los logs.", isTrue: true, explanation: "" },
        { text: "Grafana Loki almacena el contenido de los logs de forma comprimida.", isTrue: true, explanation: "" },
        { text: "Grafana Loki reduce los requerimientos de recursos en comparación con otras soluciones de logging.", isTrue: true, explanation: "" },
        { text: "Grafana Loki utiliza el lenguaje LogQL, similar a PromQL.", isTrue: true, explanation: "" },
        { text: "Grafana Loki emplea el agente Promtail para el envío de logs.", isTrue: true, explanation: "" },
        { text: "Grafana Loki ofrece integración nativa con Grafana como una de sus ventajas clave.", isTrue: true, explanation: "" },
        { text: "Grafana Loki permite la correlación temporal entre logs y métricas.", isTrue: true, explanation: "" },
        { text: "Grafana Loki es más sencillo de operar que ELK Stack.", isTrue: true, explanation: "" },
        { text: "Grafana Loki facilita un despliegue sencillo en entornos Docker y Kubernetes.", isTrue: true, explanation: "" },
        { text: "Grafana Loki forma parte de un stack PLG cohesivo.", isTrue: true, explanation: "" },
        { text: "Un ecosistema completo de observabilidad incluye métricas recolectadas por Prometheus, CloudWatch y Datadog.", isTrue: true, explanation: "" },
        { text: "El ecosistema de observabilidad incluye trazas gestionadas por herramientas como Jaeger, Zipkin y Tempo.", isTrue: true, explanation: "" },
        { text: "Los logs en un ecosistema de observabilidad pueden gestionarse con ELK, Loki y CloudWatch Logs.", isTrue: true, explanation: "" },
        { text: "La visualización en el ecosistema de observabilidad se realiza mediante herramientas como Grafana, Kibana y dashboards.", isTrue: true, explanation: "" },
        { text: "Las alertas en un ecosistema de observabilidad pueden gestionarse con Alertmanager, PagerDuty y Slack.", isTrue: true, explanation: "" },
        { text: "El primer paso de una implementación práctica con IaC consiste en definir la infraestructura.", isTrue: true, explanation: "" },
        { text: "La definición de infraestructura incluye módulos de Terraform para Prometheus, Grafana y exporters en AWS.", isTrue: true, explanation: "" },
        { text: "El segundo paso consiste en configurar como código reglas de alertas, dashboards y filtros de logs en un repositorio Git.", isTrue: true, explanation: "" },
        { text: "El tercer paso implica desplegar automáticamente la aplicación junto con el stack completo de monitoreo mediante un solo comando.", isTrue: true, explanation: "" },
        { text: "El cuarto paso consiste en iterar y mejorar, utilizando feedback continuo para optimizar la infraestructura y el código.", isTrue: true, explanation: "" },
        { text: "Infraestructura observable es igual a infraestructura confiable.", isTrue: true, explanation: "" },
        { text: "La frase “Poca observación y muchas teorías llevan al error”, atribuida a Alexis Carrel, resalta la importancia de la observación en sistemas complejos como la infraestructura.", isTrue: true, explanation: "" },
        { text: "La infraestructura es la base sobre la que corren nuestras aplicaciones.", isTrue: true, explanation: "" },
        { text: "Un cambio en la infraestructura que no es probado puede causar caídas del servicio.", isTrue: true, explanation: "" },
        { text: "Un cambio sin probar puede generar problemas de rendimiento.", isTrue: true, explanation: "" },
        { text: "Un cambio sin probar puede introducir vulnerabilidades de seguridad.", isTrue: true, explanation: "" },
        { text: "Un cambio sin probar puede provocar configuraciones inconsistentes.", isTrue: true, explanation: "" },
        { text: "IaC depende de código y, por lo tanto, el testing es esencial para evitar despliegues fallidos.", isTrue: true, explanation: "" },
        { text: "El testing en IaC permite asegurar despliegues consistentes y seguros.", isTrue: true, explanation: "" },
        { text: "Las pruebas permiten verificar errores y omisiones en los archivos de Infraestructura como Código.", isTrue: true, explanation: "" },
        { text: "Las pruebas evalúan cómo los errores afectan al entorno.", isTrue: true, explanation: "" },
        { text: "Las pruebas ayudan a construir confianza en despliegues confiables y repetibles.", isTrue: true, explanation: "" },
        { text: "Modularizar consiste en dividir la infraestructura en módulos pequeños y reutilizables.", isTrue: true, explanation: "" },
        { text: "Cada módulo debe probarse en aislamiento.", isTrue: true, explanation: "" },
        { text: "El uso de variables y parámetros en lugar de valores fijos facilita las pruebas con diferentes escenarios.", isTrue: true, explanation: "" },
        { text: "Definir outputs verificables expone información útil para validación posterior.", isTrue: true, explanation: "" },
        { text: "La idempotencia implica que ejecutar el código dos veces debe producir el mismo resultado sin cambios adicionales.", isTrue: true, explanation: "" },
        { text: "Aislar credenciales implica no incluir secretos en el código.", isTrue: true, explanation: "" },
        { text: "En entornos de prueba se deben usar credenciales falsas.", isTrue: true, explanation: "" },
        { text: "Es recomendable preparar entornos dedicados y aislados para pruebas.", isTrue: true, explanation: "" },
        { text: "Los entornos de prueba no deben afectar el desarrollo real.", isTrue: true, explanation: "" },
        { text: "El código debe soportar la destrucción completa de recursos sin dejar recursos huérfanos.", isTrue: true, explanation: "" },
        { text: "Mantener consistencia de estilo implica usar formateadores y linters.", isTrue: true, explanation: "" },
        { text: "Las pruebas End-to-End (E2E) evalúan un entorno completo.", isTrue: true, explanation: "" },
        { text: "Las pruebas de integración evalúan múltiples componentes trabajando juntos.", isTrue: true, explanation: "" },
        { text: "Las pruebas unitarias evalúan módulos aislados.", isTrue: true, explanation: "" },
        { text: "La validación sintáctica incluye linting y análisis estático.", isTrue: true, explanation: "" },
        { text: "La pirámide de pruebas establece que deben existir muchas pruebas rápidas en la base y pocas pero completas en la cima.", isTrue: true, explanation: "" },
        { text: "La validación sintáctica analiza el código sin ejecutarlo.", isTrue: true, explanation: "" },
        { text: "La validación sintáctica detecta errores de sintaxis, formato y desviaciones de guías de estilo.", isTrue: true, explanation: "" },
        { text: "terraform validate verifica que la configuración HCL sea válida.", isTrue: true, explanation: "" },
        { text: "TFLint detecta malas prácticas específicas de proveedores.", isTrue: true, explanation: "" },
        { text: "ansible-lint inspecciona playbooks buscando patrones problemáticos.", isTrue: true, explanation: "" },
        { text: "Checkov y Tfsec escanean configuraciones inseguras.", isTrue: true, explanation: "" },
        { text: "Estas validaciones se ejecutan en segundos y no crean infraestructura real.", isTrue: true, explanation: "" },
        { text: "El costo de estas validaciones es prácticamente nulo.", isTrue: true, explanation: "" },
        { text: "En Terraform, las pruebas unitarias consisten en probar módulos con recursos mock o mínimos.", isTrue: true, explanation: "" },
        { text: "En Terraform se verifican outputs y lógica interna usando Terratest o LocalStack.", isTrue: true, explanation: "" },
        { text: "En Ansible, las pruebas unitarias prueban roles en contenedores ligeros usando Molecule.", isTrue: true, explanation: "" },
        { text: "En Ansible se verifica que los procesos estén corriendo y que los puertos estén abiertos.", isTrue: true, explanation: "" },
        { text: "Las pruebas unitarias se ejecutan en minutos o menos.", isTrue: true, explanation: "" },
        { text: "Las pruebas unitarias no requieren muchos recursos reales.", isTrue: true, explanation: "" },
        { text: "Las pruebas unitarias detectan fallos rápidamente.", isTrue: true, explanation: "" },
        { text: "Las pruebas de integración verifican que varios módulos o roles funcionen en conjunto.", isTrue: true, explanation: "" },
        { text: "Las pruebas de integración pueden desplegar infraestructura real o simulada.", isTrue: true, explanation: "" },
        { text: "Un ejemplo de prueba de integración incluye un módulo VPC que crea una red virtual.", isTrue: true, explanation: "" },
        { text: "Un módulo EC2 puede lanzar instancias como parte de una prueba de integración.", isTrue: true, explanation: "" },
        { text: "La verificación de una prueba de integración comprueba la comunicación entre componentes.", isTrue: true, explanation: "" },
        { text: "Las pruebas de integración tienen un costo moderado a alto.", isTrue: true, explanation: "" },
        { text: "Las pruebas de integración toman varios minutos en ejecutarse.", isTrue: true, explanation: "" },
        { text: "Las pruebas de integración detectan problemas de interacción entre componentes.", isTrue: true, explanation: "" },
        { text: "Las pruebas E2E despliegan toda la infraestructura como en producción.", isTrue: true, explanation: "" },
        { text: "Las pruebas E2E se realizan en un entorno de prueba realista.", isTrue: true, explanation: "" },
        { text: "Las pruebas E2E incluyen aplicar la infraestructura, ejecutar verificaciones y destruir o reciclar el entorno.", isTrue: true, explanation: "" },
        { text: "Las pruebas E2E ofrecen máxima confianza.", isTrue: true, explanation: "" },
        { text: "Las pruebas E2E son más costosas y lentas.", isTrue: true, explanation: "" },
        { text: "Las pruebas E2E no se ejecutan en cada commit.", isTrue: true, explanation: "" },
        { text: "Terraform CLI incluye comandos como validate, fmt y plan.", isTrue: true, explanation: "" },
        { text: "TFLint es un linter que detecta errores comunes y buenas prácticas.", isTrue: true, explanation: "" },
        { text: "Checkov y Tfsec realizan escaneo de seguridad estático.", isTrue: true, explanation: "" },
        { text: "Checkov y Tfsec tienen más de 1000 reglas de compliance y vulnerabilidades.", isTrue: true, explanation: "" },
        { text: "Terratest es un framework en Go para pruebas automatizadas de infraestructura.", isTrue: true, explanation: "" },
        { text: "ansible-lint es la herramienta estándar para análisis estático en Ansible.", isTrue: true, explanation: "" },
        { text: "Molecule es un framework de testing completo para Ansible.", isTrue: true, explanation: "" },
        { text: "Molecule soporta drivers como Docker, Vagrant y EC2.", isTrue: true, explanation: "" },
        { text: "Testinfra y Pytest permiten escribir tests en Python para verificar el estado de hosts.", isTrue: true, explanation: "" },
        { text: "Testinfra se integra con Molecule.", isTrue: true, explanation: "" },
        { text: "El pipeline de CI/CD inicia con linting y validación automática en el commit.", isTrue: true, explanation: "" },
        { text: "Luego se ejecutan tests unitarios para verificar módulos individuales.", isTrue: true, explanation: "" },
        { text: "Posteriormente se despliega a un entorno de desarrollo.", isTrue: true, explanation: "" },
        { text: "Después se ejecutan pruebas de integración.", isTrue: true, explanation: "" },
        { text: "Luego se despliega a staging como entorno de pre-producción.", isTrue: true, explanation: "" },
        { text: "Se ejecutan pruebas End-to-End antes de producción.", isTrue: true, explanation: "" },
        { text: "El despliegue final a producción es seguro y confiable.", isTrue: true, explanation: "" },
        { text: "El testing permite detección temprana de errores antes de producción.", isTrue: true, explanation: "" },
        { text: "Existen gates de calidad para promocionar cambios.", isTrue: true, explanation: "" },
        { text: "El testing permite despliegues seguros y automatizados.", isTrue: true, explanation: "" },
        { text: "El testing asegura consistencia en cada cambio.", isTrue: true, explanation: "" },
        { text: "El enfoque Shift-Left incorpora seguridad y calidad desde el inicio.", isTrue: true, explanation: "" },
        { text: "Las pruebas son un pilar para lograr CI/CD efectivos en IaC.", isTrue: true, explanation: "" },
        { text: "SonarQube es una plataforma de análisis estático que soporta Terraform y Ansible.", isTrue: true, explanation: "" },
        { text: "SonarQube detecta bugs y vulnerabilidades.", isTrue: true, explanation: "" },
        { text: "SonarQube detecta code smells y malas prácticas.", isTrue: true, explanation: "" },
        { text: "SonarQube detecta credenciales hardcodeadas.", isTrue: true, explanation: "" },
        { text: "SonarQube detecta configuraciones inseguras y problemas de formato.", isTrue: true, explanation: "" },
        { text: "Checkov es una herramienta de análisis estático de configuración para IaC.", isTrue: true, explanation: "" },
        { text: "Checkov escanea Terraform, CloudFormation, Kubernetes, ARM y Serverless Framework.", isTrue: true, explanation: "" },
        { text: "Checkov utiliza checks basados en políticas de seguridad predefinidas.", isTrue: true, explanation: "" },
        { text: "Checkov aplica el enfoque Shift-Left Security.", isTrue: true, explanation: "" },
        { text: "Checkov se integra con pipelines CI/CD y entornos locales.", isTrue: true, explanation: "" },
        { text: "Checkov permite crear checks personalizados.", isTrue: true, explanation: "" },
        { text: "Checkov mapea controles a estándares como CIS, PCI DSS e HIPAA.", isTrue: true, explanation: "" },
        { text: "El stack Grafana, Prometheus y Loki es un estándar moderno de observabilidad.", isTrue: true, explanation: "" },
        { text: "Prometheus recopila métricas como series de tiempo usando un modelo pull.", isTrue: true, explanation: "" },
        { text: "Grafana permite crear dashboards y alertas.", isTrue: true, explanation: "" },
        { text: "Loki es un sistema eficiente de agregación de logs.", isTrue: true, explanation: "" },
        { text: "Loki solo indexa etiquetas y no el contenido completo de los logs.", isTrue: true, explanation: "" },
        { text: "Promtail recopila logs y los envía a Loki.", isTrue: true, explanation: "" },
        { text: "LogQL permite consultar logs por etiquetas y expresiones regulares", isTrue: true, explanation: "" },
        { text: "•  Los requerimientos no funcionales (NFR) se enfocan únicamente en las funcionalidades del sistema, mientras que los requerimientos funcionales describen cómo debe comportarse el sistema bajo distintas condiciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los requerimientos no funcionales no influyen en estándares de calidad, rendimiento ni confiabilidad en sistemas distribuidos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los balanceadores de carga son mecanismos que concentran todas las peticiones en una sola instancia de servicio para simplificar la arquitectura.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El atributo de calidad disponibilidad implica que el sistema deja de estar accesible cuando una instancia falla, aun cuando exista un balanceador de carga.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El atributo de calidad escalabilidad impide añadir o retirar instancias durante picos de demanda sin interrumpir el servicio.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El atributo de calidad rendimiento se logra cuando el balanceador incrementa las latencias y los tiempos de respuesta del sistema.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La tolerancia a fallos reduce la resiliencia del sistema al mantener servidores caídos recibiendo tráfico.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La mantenibilidad se ve afectada negativamente porque el balanceador impide realizar actualizaciones progresivas sin interrupciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los balanceadores de carga no son considerados una táctica arquitectónica relacionada con disponibilidad ni rendimiento según Bass, Clements y Kazman (2022).", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El uso de balanceadores de carga no está relacionado con decisiones de arquitectura ni con el manejo de crecimiento de usuarios o fallos parciales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En un contexto de e-commerce, un requerimiento no funcional como soportar 10,000 usuarios concurrentes sin degradar el tiempo de respuesta no implica ninguna necesidad de diseño específica.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Dicho requerimiento no funcional no requiere implementar ningún mecanismo para distribuir solicitudes entre múltiples servidores.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El atributo de escalabilidad no puede ser operacionalizado mediante tácticas arquitectónicas como el balanceo de carga.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La decisión de utilizar un balanceador de carga se justifica incluso cuando los requerimientos no funcionales pueden cumplirse fácilmente con una única instancia.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los escenarios de alta concurrencia, como plataformas de streaming o portales educativos masivos, no requieren balanceadores de carga.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los sistemas que deben garantizar disponibilidad 24/7, como los financieros o de salud, no se benefician del uso de balanceadores de carga.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los despliegues continuos no requieren balanceadores de carga, aun cuando se necesiten actualizaciones sin interrupciones del negocio.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La tolerancia a fallos no es relevante en infraestructuras distribuidas en múltiples zonas de disponibilidad o regiones de nube.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La optimización de costos no puede lograrse mediante balanceo inteligente ni mediante el ajuste dinámico según la demanda.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Herramientas como Ansible no permiten traducir requerimientos no funcionales en configuraciones repetibles ni auditables.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El nivel de automatización que ofrece Ansible no tiene impacto en la disponibilidad, escalabilidad ni mantenibilidad del sistema.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Ansible no tiene capacidad para instalar automáticamente software como Nginx o HAProxy en servidores objetivo.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Ansible no permite configurar upstreams ni distribuir tráfico entre servidores web.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Ansible no incorpora mecanismos relacionados con health checks ni con la tolerancia a fallos del sistema.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización mediante Ansible incrementa los errores humanos en la configuración de la infraestructura.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización no contribuye al cumplimiento de estándares definidos dentro del sistema.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización provoca configuraciones inconsistentes entre los distintos entornos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El escalamiento multi-cloud mediante automatización impide definir reglas de escalamiento consistentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización dificulta la unificación de entornos multi-cloud.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La gestión centralizada no es un beneficio del escalamiento multi-cloud soportado por automatización.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El impacto de la automatización en la disponibilidad se refleja en una disminución del tiempo de actividad del sistema.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización incrementa la latencia del sistema y empeora los tiempos de respuesta.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización limita severamente la capacidad de crecimiento del sistema.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En la industria de servicios financieros, Ansible y los balanceadores no se utilizan en sistemas de trading con requerimientos de alta disponibilidad y baja latencia.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En el sector de educación online, las plataformas educativas masivas no emplean estas soluciones para manejar picos de tráfico durante exámenes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En la industria del streaming, los servicios de video no utilizan estas arquitecturas para distribuir contenido a gran escala.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En la arquitectura de referencia, el balanceador no recibe ni distribuye las solicitudes entrantes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La distribución del tráfico en la arquitectura de referencia no utiliza algoritmos como round-robin ni least-connections.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los health checks en la arquitectura de referencia no verifican la salud de los servidores backend.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La arquitectura no contempla servidores web activos ni replicados.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El mecanismo de failover no redirige el tráfico cuando uno de los servidores falla.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Esta arquitectura no demuestra la implementación simultánea de múltiples atributos de calidad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El paso inicial para llevar la teoría a la práctica no incluye la identificación de requerimientos no funcionales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El segundo paso no consiste en seleccionar ninguna táctica arquitectónica como solución.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El tercer paso no implica el uso de Infrastructure as Code ni herramientas como Ansible.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El último paso no contempla la validación de los atributos de calidad ni el cumplimiento de los requerimientos no funcionales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los balanceadores de carga no representan una decisión arquitectónica basada en requerimientos no funcionales ni atributos de calidad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La automatización mediante herramientas como Ansible no simplifica la configuración ni garantiza el cumplimiento de estándares.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La combinación de balanceadores de carga y automatización no contribuye a cerrar la brecha entre la teoría arquitectónica y la práctica de IaC.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los balanceadores de carga son únicamente un componente técnico sin relación con decisiones de excelencia arquitectónica.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Los atributos de calidad no pueden operacionalizarse mediante tácticas arquitectónicas como el uso de balanceadores de carga.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La Infraestructura como Código (IaC) permite automatizar despliegues, pero elimina por completo la necesidad de verificar si el sistema funciona correctamente después del despliegue.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La monitorización no implica una observación continua del sistema, sino únicamente revisiones ocasionales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La monitorización no rastrea métricas de infraestructura ni de aplicaciones como CPU, memoria, tráfico o latencia.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La monitorización solo detecta fallos después de que los usuarios ya han sido afectados, sin capacidad de detección proactiva.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La monitorización no utiliza datos históricos ni analiza patrones para identificar tendencias u optimizar recursos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El logging no recolecta ni almacena registros detallados de eventos como errores, inicios de sesión o transacciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El logging no proporciona información sobre qué ocurrió ni cuándo ocurrió, y no es útil para la depuración forense.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El monitoreo no responde a la pregunta “¿Cómo se comporta el sistema ahora?”, sino únicamente a eventos pasados.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El monitoreo no se basa en métricas numéricas ni en información en tiempo real.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El monitoreo tiene un enfoque exclusivamente reactivo y no genera alertas ante condiciones anómalas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El logging no responde a la pregunta “¿Qué sucedió y cuándo?”.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El logging no se basa en registros históricos de eventos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El logging tiene un enfoque proactivo y no se utiliza para el diagnóstico de causas específicas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La monitorización y el logging no son prácticas complementarias y no se apoyan mutuamente para el análisis de incidentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La observabilidad no incluye métricas, logs ni trazas distribuidas como parte de su definición.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La observabilidad no permite obtener una visión del estado interno de sistemas complejos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En Infraestructura como Código (IaC), la observabilidad no es relevante y no proporciona visibilidad en tiempo real.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La observabilidad no facilita la detección proactiva de problemas antes de que impacten a los usuarios.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El uso de logs y métricas no influye en la reducción del MTTR ni en la velocidad de resolución de incidentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El análisis histórico de métricas y logs no contribuye a la mejora continua ni a la planificación de capacidad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La observabilidad no impacta en la experiencia del usuario y depende exclusivamente de reportes manuales de clientes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El caso “Antes vs Después” no compara escenarios con y sin observabilidad en la respuesta ante incidentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En un escenario sin observabilidad, las fallas se detectan automáticamente sin intervención de los usuarios.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Sin observabilidad, la respuesta ante incidentes no requiere búsquedas manuales en logs dispersos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La ausencia de observabilidad permite identificar la causa de un problema en pocos segundos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Sin observabilidad, el sistema se estabiliza rápidamente sin impactos prolongados.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La falta de observabilidad reduce el riesgo de error humano durante la resolución de incidentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Con observabilidad implementada, no existen alertas automáticas para detectar anomalías.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La observabilidad no permite que un dashboard muestre contexto inmediato sobre un incidente.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Con observabilidad, los logs no están centralizados ni pueden filtrarse por tiempo.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La observabilidad dificulta la identificación de la causa raíz de los problemas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Gracias a la observabilidad, la recuperación del sistema requiere largos periodos de tiempo.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El concepto de “Monitoreo como Código” no existe dentro de las prácticas modernas de observabilidad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El enfoque de “Monitoreo como Código” no adopta el principio de “Everything as Code”.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  En el monitoreo como código, las métricas, alertas y logs no se definen mediante archivos de configuración.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El versionado no es un beneficio del monitoreo como código.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El monitoreo como código dificulta la colaboración entre equipos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La reproducibilidad no es un beneficio asociado al monitoreo como código.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  El monitoreo como código no garantiza consistencia entre entornos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La adopción del monitoreo como código incrementa los errores manuales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La integración con IaC no permite definir componentes de observabilidad en código ni usar herramientas como Terraform o Ansible.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La integración con IaC no permite aprovisionar automáticamente herramientas como Prometheus o Grafana.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La integración con IaC impide versionar cambios como reglas de alertas y dashboards.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  La integración con IaC no asegura despliegues consistentes entre entornos de desarrollo, prueba y producción.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Prometheus no es un sistema open source ni utiliza una base de datos de series temporales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Prometheus utiliza un modelo push exclusivamente y no es adecuado para entornos Kubernetes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Grafana no es una plataforma de visualización ni soporta dashboards conectados a múltiples fuentes de datos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  AWS CloudWatch no es una solución nativa de AWS ni proporciona métricas automáticas o alarmas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "•  Prometheus no recolecta métricas de forma periódica ni utiliza un modelo pull.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Prometheus almacena métricas sin marcas de tiempo ni etiquetas asociadas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Prometheus no incorpora mecanismos de service discovery para entornos dinámicos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Prometheus no utiliza exporters para recolectar métricas de sistemas populares.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Prometheus no ofrece ningún lenguaje propio para realizar consultas sobre métricas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Prometheus no incluye Alertmanager ni permite el envío de notificaciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Prometheus no es un proyecto graduado de la CNCF ni es considerado un estándar en Kubernetes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana no está orientado a la visualización ni ofrece capacidades gráficas avanzadas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana solo puede conectarse a una única fuente de datos y no soporta integración con Prometheus ni CloudWatch.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana no permite crear dashboards interactivos ni gráficos en tiempo real.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana no ofrece paneles configurables ni consultas personalizadas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana no puede actuar como un hub central de observabilidad para métricas, logs y trazas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Datadog no integra monitoreo de infraestructura, APM ni logs en una sola plataforma.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Datadog ofrece un número muy limitado de integraciones y no permite correlacionar métricas, trazas y logs.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "New Relic no tiene un enfoque centrado en APM ni en la experiencia de usuario.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "New Relic no proporciona trazabilidad end-to-end ni análisis unificado de aplicaciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Una ventaja de las soluciones SaaS empresariales es que requieren mantener y operar infraestructura propia.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Las soluciones SaaS empresariales no presentan ningún costo asociado al licenciamiento.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "El costo por licenciamiento no se considera una desventaja en las soluciones SaaS empresariales.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "ELK Stack no está compuesto por Elasticsearch, Logstash y Kibana.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "ELK Stack no es una solución open source ni es ampliamente utilizada para logging.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "ELK Stack no permite centralizar logs ni realizar búsquedas o visualizaciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no es una alternativa ligera ni está inspirado en Prometheus.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki indexa el contenido completo de los logs en lugar de solo etiquetas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no se integra de forma nativa con Grafana.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "CloudWatch Logs no es un servicio nativo de AWS para la centralización de logs.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "CloudWatch Logs no centraliza logs provenientes de servicios como EC2, Lambda o API Gateway.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "CloudWatch Logs no permite crear filtros de métricas ni generar alertas a partir de logs.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Logstash y Beats no recopilan ni transportan logs desde diversas fuentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Elasticsearch no almacena logs en clústeres indexados ni permite búsquedas rápidas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Kibana no proporciona ninguna interfaz web para consultar o visualizar logs.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "ELK Stack no permite buscar logs por texto ni generar visualizaciones de eventos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no adopta una filosofía similar a Prometheus aplicada al logging.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki indexa todo el contenido de los logs y no utiliza etiquetas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki almacena los logs sin ningún tipo de compresión.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki incrementa significativamente los requerimientos de recursos frente a otras soluciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no utiliza ningún lenguaje de consulta similar a PromQL.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no emplea Promtail ni ningún agente para el envío de logs.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "La integración nativa con Grafana no es una ventaja asociada a Grafana Loki.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no permite correlación temporal entre logs y métricas.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki es más complejo de operar que ELK Stack.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki dificulta el despliegue en entornos Docker y Kubernetes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Grafana Loki no forma parte de ningún stack cohesivo de observabilidad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Un ecosistema de observabilidad no incluye métricas recolectadas por Prometheus, CloudWatch o Datadog.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "El ecosistema de observabilidad no contempla el uso de herramientas de trazas como Jaeger o Zipkin.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Los logs no forman parte de un ecosistema de observabilidad ni se gestionan con ELK, Loki o CloudWatch Logs.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "La visualización no es un componente del ecosistema de observabilidad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Las alertas no pueden gestionarse mediante herramientas como Alertmanager, PagerDuty o Slack.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "El primer paso de una implementación práctica con IaC no incluye la definición de infraestructura.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "La definición de infraestructura no puede incluir módulos de Terraform para Prometheus ni Grafana.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "El segundo paso no consiste en configurar reglas de alertas ni dashboards como código.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "El tercer paso no permite desplegar automáticamente la aplicación junto con el stack de monitoreo.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "El cuarto paso no contempla iteración ni mejora continua basada en feedback.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Infraestructura observable no guarda ninguna relación con infraestructura confiable.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "La frase atribuida a Alexis Carrel no resalta la importancia de la observación en sistemas complejos.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "La infraestructura no constituye la base sobre la que corren las aplicaciones.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Un cambio en la infraestructura sin pruebas no puede causar caídas del servicio.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Un cambio sin probar no genera problemas de rendimiento.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Un cambio sin probar no introduce vulnerabilidades de seguridad.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "Un cambio sin probar no provoca configuraciones inconsistentes.", isTrue: false, explanation: "La afirmación es falsa." },
        { text: "IaC no depende de código y el testing no es necesario para evitar despliegues fallidos.", isTrue: false, explanation: "La afirmación es falsa." },
    ];
}


function startQuiz() {
    questions = loadQuestions();
    // Shuffle questions logic
    questions.sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;
    score = { correct: 0, incorrect: 0 };
    history = [];

    updateStats();
    showQuestion();
    switchScreen('quiz');
}


function showQuestion() {
    const q = questions[currentQuestionIndex];
    ui.questionText.textContent = q.text;
    ui.currentQ.textContent = currentQuestionIndex + 1;
    ui.totalQ.textContent = questions.length;

    const progressPct = ((currentQuestionIndex) / questions.length) * 100;
    ui.progressFill.style.width = `${progressPct}%`;
}

function handleAnswer(userAnswer) {
    const q = questions[currentQuestionIndex];
    const isCorrect = userAnswer === q.isTrue;

    if (isCorrect) {
        score.correct++;
        showFeedback(true, "¡Correcto!");
    } else {
        score.incorrect++;
        showFeedback(false, "Incorrecto. " + (q.explanation || ""));
    }

    // Record history
    history.push({
        question: q.text,
        userAnswer: userAnswer,
        correctAnswer: q.isTrue,
        isCorrect: isCorrect
    });

    updateStats();
}

function showFeedback(isCorrect, message) {
    ui.feedbackTitle.textContent = isCorrect ? "¡Bien!" : "Ups...";
    ui.feedbackMsg.textContent = message;

    const content = ui.feedbackOverlay.querySelector('.feedback-content');
    content.className = 'feedback-content ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');

    ui.feedbackOverlay.classList.remove('hidden');

    setTimeout(() => {
        ui.feedbackOverlay.classList.add('hidden');
        nextQuestion();
    }, 1500); // Wait 1.5s then move on
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function updateStats() {
    ui.correctCount.textContent = score.correct;
    ui.incorrectCount.textContent = score.incorrect;
}

function finishQuiz() {
    ui.finalCorrect.textContent = score.correct;
    ui.finalTotal.textContent = questions.length;
    const pct = Math.round((score.correct / questions.length) * 100);
    ui.finalScore.textContent = `${pct}%`;
    switchScreen('result');
}

function showHistory() {
    ui.historyList.innerHTML = '';
    history.forEach((h, index) => {
        const li = document.createElement('li');
        li.className = `history-item ${h.isCorrect ? 'correct' : 'incorrect'}`;
        li.innerHTML = `
            <span class="history-q">${index + 1}. ${h.question}</span>
            <div class="history-a">
                Tu respuesta: <strong>${h.userAnswer ? 'Verdadero' : 'Falso'}</strong> 
                | Correcta: <strong>${h.correctAnswer ? 'Verdadero' : 'Falso'}</strong>
            </div>
        `;
        ui.historyList.appendChild(li);
    });
    switchScreen('history');
}

function restartQuiz() {
    startQuiz();
}

function switchScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    Object.values(screens).forEach(s => s.classList.remove('active'));

    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('active');
}

// Pre-load logic is called by startQuiz, so we just init
questions = loadQuestions();
