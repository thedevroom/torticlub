# -*- coding: utf-8 -*-
"""
TortiClub — Dossier de negocio completo (PDF)
Genera un documento profesional de apertura y operación en Barcelona.
"""
from __future__ import annotations

import os
from datetime import datetime
from pathlib import Path

from fpdf import FPDF
from fpdf.enums import XPos, YPos

ROOT = Path(r"C:\Users\sergi\Desktop\TortiClub")
OUT = ROOT / "TortiClub_Dossier_Negocio_Completo.pdf"
LOGO = ROOT / "logo-oficial.png"
LOGO_LOCK = ROOT / "logo-1.png"
POSTER = ROOT / "poster.png"
CARTA = ROOT / "carta.png"
WEB_BRAND = ROOT / "web" / "public" / "brand"

CREAM = (247, 243, 232)
YELLOW = (255, 210, 63)
INK = (17, 17, 17)
MUTED = (90, 85, 75)
WHITE = (255, 255, 255)
LIGHT = (251, 248, 241)

FONT = "C:/Windows/Fonts/arial.ttf"
FONTB = "C:/Windows/Fonts/arialbd.ttf"
FONTI = "C:/Windows/Fonts/ariali.ttf"


class Dossier(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=True, margin=22)
        self.add_font("Body", "", FONT)
        self.add_font("Body", "B", FONTB)
        self.add_font("Body", "I", FONTI)
        self.chapter = ""
        self._toc: list[tuple[str, int]] = []

    def header(self):
        if self.page_no() <= 2:
            return
        self.set_fill_color(*CREAM)
        self.rect(0, 0, 210, 14, "F")
        self.set_y(4)
        self.set_font("Body", "B", 8)
        self.set_text_color(*INK)
        self.cell(0, 5, "TORTICLUB  ·  Dossier de negocio  ·  Confidencial", align="L")
        self.set_draw_color(*YELLOW)
        self.set_line_width(0.6)
        self.line(12, 13, 198, 13)
        self.set_y(18)

    def footer(self):
        if self.page_no() <= 1:
            return
        self.set_y(-16)
        self.set_draw_color(*YELLOW)
        self.set_line_width(0.4)
        self.line(12, self.get_y(), 198, self.get_y())
        self.set_y(-12)
        self.set_font("Body", "", 8)
        self.set_text_color(*MUTED)
        self.cell(90, 6, "Parte. Comparte. Repite.  ·  Sant Andreu, Barcelona", align="L")
        self.cell(0, 6, f"{self.page_no()}", align="R")

    def cover(self):
        self.add_page()
        self.set_fill_color(*CREAM)
        self.rect(0, 0, 210, 297, "F")
        # yellow side bar
        self.set_fill_color(*YELLOW)
        self.rect(0, 0, 12, 297, "F")
        if LOGO.exists():
            self.image(str(LOGO), x=78, y=42, w=54)
        self.set_y(110)
        self.set_font("Body", "B", 36)
        self.set_text_color(*INK)
        self.cell(0, 14, "TORTICLUB", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font("Body", "", 14)
        self.set_text_color(*MUTED)
        self.ln(4)
        self.cell(0, 8, "Parte. Comparte. Repite.", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(10)
        self.set_font("Body", "B", 16)
        self.set_text_color(*INK)
        self.multi_cell(0, 8, "DOSSIER COMPLETO DE NEGOCIO\nApertura, legal, operaciones, marca y finanzas", align="C")
        self.ln(12)
        self.set_font("Body", "", 11)
        self.set_text_color(*MUTED)
        self.cell(0, 6, "Marca gastronómica de producto  ·  Tortillas para compartir", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.cell(0, 6, "Base: Sant Andreu, Barcelona  ·  Canal: web + WhatsApp + delivery", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(20)
        self.set_font("Body", "", 10)
        self.cell(0, 6, f"Versión 1.0  ·  {datetime.now().strftime('%d/%m/%Y')}", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.cell(0, 6, "Documento confidencial — uso interno y presentaciones a partners", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_y(250)
        self.set_fill_color(*INK)
        self.rect(12, 250, 186, 28, "F")
        self.set_y(256)
        self.set_font("Body", "B", 11)
        self.set_text_color(*YELLOW)
        self.cell(0, 6, "INCLUYE", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font("Body", "", 9)
        self.set_text_color(*CREAM)
        self.multi_cell(
            0,
            5,
            "Business Plan · Brand Book · Manual de operaciones · Legal & fiscal ·\n"
            "Fichas técnicas · Lanzamiento · Finanzas · Delivery · Riesgos",
            align="C",
        )

    def toc_page(self, entries: list[tuple[str, int]]):
        self.add_page()
        self.h1("Índice general")
        self.p(
            "Este dossier reúne todo lo necesario para abrir y operar TortiClub "
            "como marca de producto gastronómico en Barcelona, con rigor legal, "
            "operativo y financiero."
        )
        self.ln(4)
        for title, page in entries:
            self.set_font("Body", "", 11)
            self.set_text_color(*INK)
            self.cell(150, 7, title, align="L")
            self.set_text_color(*MUTED)
            self.cell(0, 7, str(page), align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.set_draw_color(220, 210, 190)
            self.line(12, self.get_y(), 198, self.get_y())

    def h1(self, text: str):
        self.chapter = text
        self._toc.append((text, self.page_no()))
        self.ln(2)
        self.set_font("Body", "B", 20)
        self.set_text_color(*INK)
        self.multi_cell(0, 9, text)
        self.set_draw_color(*YELLOW)
        self.set_line_width(1.2)
        y = self.get_y() + 1
        self.line(12, y, 70, y)
        self.ln(6)

    def h2(self, text: str):
        if self.get_y() > 250:
            self.add_page()
        self.ln(3)
        self.set_font("Body", "B", 13)
        self.set_text_color(*INK)
        self.multi_cell(0, 7, text)
        self.ln(2)

    def h3(self, text: str):
        if self.get_y() > 255:
            self.add_page()
        self.ln(2)
        self.set_font("Body", "B", 11)
        self.set_text_color(*INK)
        self.multi_cell(0, 6, text)
        self.ln(1)

    def p(self, text: str):
        self.set_font("Body", "", 10)
        self.set_text_color(*INK)
        self.multi_cell(0, 5.2, text)
        self.ln(2)

    def bullet(self, text: str):
        self.set_font("Body", "", 10)
        self.set_text_color(*INK)
        x = self.get_x()
        self.set_fill_color(*YELLOW)
        self.circle(x + 1.5, self.get_y() + 2.2, 1.1, style="F")
        self.set_x(x + 6)
        self.multi_cell(0, 5.2, text)
        self.ln(1)

    def note(self, text: str):
        if self.get_y() > 250:
            self.add_page()
        self.set_fill_color(*LIGHT)
        self.set_draw_color(*YELLOW)
        self.set_line_width(0.8)
        x, y = 12, self.get_y()
        self.set_font("Body", "I", 9)
        self.set_text_color(*MUTED)
        # estimate height
        self.set_x(16)
        # simple box
        start = self.get_y()
        self.set_xy(16, start + 3)
        self.multi_cell(178, 4.8, text)
        end = self.get_y() + 3
        self.set_xy(x, start)
        self.set_fill_color(*LIGHT)
        h = end - start
        self.rect(x, start, 186, h, "F")
        self.set_fill_color(*YELLOW)
        self.rect(x, start, 2.5, h, "F")
        self.set_xy(16, start + 3)
        self.set_font("Body", "I", 9)
        self.set_text_color(*MUTED)
        self.multi_cell(178, 4.8, text)
        self.set_y(end + 2)

    def table(self, headers: list[str], rows: list[list[str]], col_w: list[float] | None = None):
        if self.get_y() > 230:
            self.add_page()
        n = len(headers)
        if not col_w:
            w = 186 / n
            col_w = [w] * n
        self.set_font("Body", "B", 8)
        self.set_fill_color(*INK)
        self.set_text_color(*CREAM)
        for i, h in enumerate(headers):
            self.cell(col_w[i], 7, h, border=0, fill=True, align="C")
        self.ln()
        self.set_font("Body", "", 8)
        for r_i, row in enumerate(rows):
            if self.get_y() > 270:
                self.add_page()
            if r_i % 2 == 0:
                self.set_fill_color(*LIGHT)
            else:
                self.set_fill_color(*CREAM)
            self.set_text_color(*INK)
            for i, cell in enumerate(row):
                self.cell(col_w[i], 6.5, str(cell)[:48], border=0, fill=True, align="C" if i else "L")
            self.ln()
        self.ln(3)

    def img_safe(self, path: Path, w: float = 80, h: float | None = None):
        if path.exists():
            try:
                if h:
                    self.image(str(path), w=w, h=h)
                else:
                    self.image(str(path), w=w)
                self.ln(3)
            except Exception:
                pass


def build():
    pdf = Dossier()
    pdf.set_title("TortiClub — Dossier de negocio completo")
    pdf.set_author("TortiClub")
    pdf.set_creator("TortiClub Dossier Generator")

    # ——— COVER ———
    pdf.cover()

    # Placeholder TOC page (filled later conceptually by listing chapters)
    # We'll build content and approximate TOC at start with known structure
    pdf.add_page()
    pdf.h1("0. Cómo usar este dossier")
    pdf.p(
        "Este documento está pensado para fundadores, asesores, inversores y partners. "
        "Reúne la estrategia de marca TortiClub, el marco legal español aplicable a un "
        "negocio alimentario en Barcelona, el plan operativo de cocina y delivery, el "
        "brand book, las fichas técnicas de producto, el plan de lanzamiento y las "
        "proyecciones financieras. Las cifras son estimaciones realistas de mercado "
        "Barcelona 2025–2026; deben contrastarse con presupuestos reales de locales, "
        "seguros y asesoría."
    )
    pdf.note(
        "Aviso legal: este dossier no sustituye el asesoramiento de un gestor, abogado "
        "especializado en hostelería/food business ni de un técnico sanitario. "
        "Normativa municipal y autonómica puede variar; verificar siempre en el "
        "Ayuntamiento de Barcelona y en la Generalitat de Catalunya."
    )
    pdf.h2("Mapa del documento")
    for line in [
        "1. Resumen ejecutivo y promesa de marca",
        "2. Modelo de negocio y propuesta de valor",
        "3. Análisis de mercado (Barcelona, competencia, tendencias)",
        "4. Producto, recetas, gramajes, alérgenos y fichas técnicas",
        "5. Brand Book y sistema de identidad",
        "6. Formatos, precios y unit economics",
        "7. Manual de operaciones y control de calidad",
        "8. Legal, fiscal, sanitarios, seguros y protección de marca",
        "9. Estructura societaria y opciones (autónomo, SL, coworking food)",
        "10. Barcelona Activa y ecosistema de apoyo",
        "11. Local, cocina, proveedores y cadena de suministro",
        "12. Canales de venta: web, WhatsApp, Glovo, Uber Eats, Just Eat",
        "13. Marketing, redes sociales y lanzamiento",
        "14. Plan financiero y provisiones",
        "15. Riesgos, KPIs y roadmap 12–24 meses",
        "16. Anexos y checklist de apertura",
        "17. Profundización legal y fiscal (España / Catalunya)",
        "18. Manual de operaciones ampliado (SOPs)",
        "19. Fichas técnicas completas por sabor + alérgenos UE",
        "20. Brand Book ampliado y sistema visual",
        "21. Provisiones financieras detalladas (cashflow 12 meses)",
        "22. Análisis de mercado ampliado y benchmark Mercadona",
        "23. Marketing, redes y playbook marketplaces",
        "24. Calidad, formación y personas",
        "25. Stack digital y evolución del producto web",
        "26. Checklist maestro de apertura (100 puntos)",
    ]:
        pdf.bullet(line)

    # ——— 1 ———
    pdf.add_page()
    pdf.h1("1. Resumen ejecutivo")
    if LOGO_LOCK.exists():
        pdf.img_safe(LOGO_LOCK, w=55)
    pdf.p(
        "TortiClub es una marca de producto gastronómico —no un restaurante clásico— "
        "nacida en Sant Andreu (Barcelona). Vende la experiencia de compartir: "
        "tortillas de 24 cm en formatos SOLO, DUO y CLUB, con sabores limitados y "
        "perfectos, packaging premium y un tono de marca cercano, elegante y "
        "memorable (mantra: Parte. Comparte. Repite.)."
    )
    pdf.h2("1.1 La promesa")
    pdf.bullet("Producto: tortilla hecha al momento, jugosa por dentro, dorada por fuera.")
    pdf.bullet("Formato: SOLO (1 sabor) · DUO (2) · CLUB (4 cuartos / 4 sabores).")
    pdf.bullet("Sabores activos: La Clásica, Chorizo Picante, Cebolla Caramelizada, Jamón Ibérico.")
    pdf.bullet("Canal: web propia (torticlubworld.vercel.app), WhatsApp de confirmación, posible delivery propio + marketplaces.")
    pdf.bullet("Marca: identidad visual reconocible (ojos amarillos + crema + negro), packaging coleccionable.")
    pdf.h2("1.2 Precios al público (PVP orientativos)")
    pdf.table(
        ["Formato / sabor", "PVP"],
        [
            ["SOLO — La Clásica", "9,90 €"],
            ["SOLO — Chorizo / Cebolla (especial)", "11,90 €"],
            ["SOLO — Jamón Ibérico", "12,90 €"],
            ["DUO (2 sabores)", "12,90 €"],
            ["CLUB (4 sabores)", "14,90 €"],
        ],
        [130, 56],
    )
    pdf.h2("1.3 Objetivos de arranque (primeros 12 meses)")
    pdf.bullet("Validar ticket medio > 13 € y repetición mensual ≥ 25% de clientes.")
    pdf.bullet("Consolidar 15–40 pedidos/día en días fuertes sin romper calidad.")
    pdf.bullet("Marca con coherencia total web–packaging–IG.")
    pdf.bullet("Base legal y sanitaria impecable (registro, APPCC, etiquetado, seguros).")
    pdf.bullet("Decisión informada: dark kitchen propia vs. cocina compartida vs. cloud kitchen.")

    # ——— 2 ———
    pdf.add_page()
    pdf.h1("2. Modelo de negocio y propuesta de valor")
    pdf.h2("2.1 Qué no es TortiClub")
    pdf.bullet("No es un bar de tortillas genérico ni una franquicia de restaurante.")
    pdf.bullet("No compite solo por precio o por rapidez de fast-food.")
    pdf.bullet("No lanza 20 sabores: lanza pocos, perfectos (confianza + control de stock).")
    pdf.h2("2.2 Qué sí es")
    pdf.p(
        "Una food brand de producto con ritual de consumo (partir y compartir), "
        "experiencia digital de pedido y unboxing premium. El valor percibido "
        "combina: calidad del producto + diseño + pertenencia al «Club»."
    )
    pdf.h2("2.3 Segmentos de cliente")
    pdf.table(
        ["Segmento", "Motivo de compra", "Canal preferente"],
        [
            ["Parejas 25–40", "Cena fácil, calidad, foto IG", "Web / Instagram"],
            ["Grupos / piso", "CLUB 4 sabores, compartir", "WhatsApp / web"],
            ["Oficinas BCN", "Almuerzo o after-work", "Pedido programado"],
            ["Regalo / detalle", "Packaging + tarjeta", "Web + recogida"],
            ["Habituales Club", "Repetición, favoritos", "Web + reserva"],
        ],
        [45, 75, 66],
    )
    pdf.h2("2.4 Fuentes de ingreso")
    pdf.bullet("Venta directa de producto (core).")
    pdf.bullet("Delivery propio (margen mejor) y/o marketplaces (margen peor, alcance mayor).")
    pdf.bullet("Merchandising futuro (tote, pegatinas, camisetas) — fase 2.")
    pdf.bullet("Eventos / catering mini (fase 2–3) sin diluir la marca.")
    pdf.h2("2.5 Ventaja competitiva")
    pdf.p(
        "Combinación de (1) producto con estándar industrial de calidad, "
        "(2) sistema de formatos que educa a compartir, (3) marca con "
        "personalidad propia y (4) experiencia digital no genérica de restaurante."
    )

    # ——— 3 ———
    pdf.add_page()
    pdf.h1("3. Análisis de mercado")
    pdf.h2("3.1 Contexto Barcelona")
    pdf.p(
        "Barcelona concentra demanda alta de food delivery, cultura de picoteo y "
        "compartir, y sensibilidad a la marca y al diseño. Sant Andreu aporta "
        "identidad de barrio y costes de local posiblemente más asequibles que "
        "Eixample/Gótico, con buena conectividad."
    )
    pdf.h2("3.2 Tendencias relevantes")
    pdf.bullet("Delivery y dark kitchens consolidados post-pandemia.")
    pdf.bullet("Consumidor valora origen, frescura y storytelling.")
    pdf.bullet("Menos SKUs, más calidad (anti-menú infinito).")
    pdf.bullet("Packaging sostenible y «unboxing» como marketing orgánico.")
    pdf.bullet("Marcas D2C (direct-to-consumer) con comunidad en Instagram.")
    pdf.h2("3.3 Competencia (mapa simplificado)")
    pdf.table(
        ["Tipo", "Ejemplos / patrón", "Implicación TortiClub"],
        [
            ["Bar de barrio", "Tortilla de menú del día", "No competir en precio bajo"],
            ["Brasa / gastro", "Tortilla premium en sala", "Diferenciarse en delivery+marca"],
            ["Delivery genérico", "Apps, variedad", "Enfoque monoproducto"],
            ["Food brands", "Helados, cookies, bowls", "Benchmark de marca, no de plato"],
        ],
        [40, 70, 76],
    )
    pdf.h2("3.4 Análisis tipo «Mercadona» (retail y benchmark de coste)")
    pdf.p(
        "Mercadona no es competencia directa de TortiClub, pero es referencia "
        "obligada de precios de materia prima, expectativa de frescura del "
        "consumidor español y de la tortilla de patata como producto cultural "
        "de gran consumo."
    )
    pdf.h3("Aprendizajes del retail para TortiClub")
    pdf.bullet("El cliente conoce el coste percibido del huevo, patata y AOVE: el premium debe justificarse con calidad y experiencia.")
    pdf.bullet("La tortilla casera/supermercado ancla el precio psicológico bajo; el salto a 9,90–14,90 € se sostiene por «hecha al momento», packaging y marca.")
    pdf.bullet("Estabilidad de receta y control de merma (Mercadona optimiza surtido): TortiClub debe limitar sabores y rotar con datos de venta.")
    pdf.bullet("Logística de frío y caducidad cortas: planificar lotes y comunicación «consumir en 24 h».")
    pdf.h3("Precios orientativos de compra (proveedor / mayorista BCN, IVA no incluido o según factura)")
    pdf.table(
        ["Ingrediente", "Rango €/kg u.o.", "Notas"],
        [
            ["Huevos camperos (M/L)", "2,5–4,5 €/docena", "Priorizar granja cercana"],
            ["Patata", "0,6–1,2 €/kg", "Variedad para freír/pochar"],
            ["Cebolla", "0,8–1,5 €/kg", "Dulce para caramelizar"],
            ["AOVE", "5–12 €/litro", "Marca media-alta hostelería"],
            ["Chorizo picante", "6–12 €/kg", "Proveedor cárnico"],
            ["Jamón ibérico (tacos/recortes)", "18–40 €/kg", "Impacto fuerte en coste SOLO"],
            ["Sal / especias", "bajo", "Control por lote"],
        ],
        [70, 40, 76],
    )
    pdf.note(
        "Los rangos varían con inflación alimentaria, estacionalidad y canal "
        "(Makro, Condis Pro, Mercado, granjas, distribuidores HORECA). "
        "Negociar precios a partir de volúmenes semanales."
    )
    pdf.h2("3.5 TAM / SAM / SOM (orden de magnitud)")
    pdf.p(
        "TAM: mercado de food delivery y comida preparada en AMB (área metropolitana). "
        "SAM: consumidores que piden comida premium o de compartir 1–4 veces/mes en BCN. "
        "SOM realista año 1: captar una fracción muy pequeña con 20–60 pedidos/día en picos "
        "puede ser un negocio saludable si el margen bruto de producto se mantiene > 60% "
        "antes de delivery y marketing."
    )

    # ——— 4 ———
    pdf.add_page()
    pdf.h1("4. Producto, recetas y fichas técnicas")
    pdf.p(
        "Especificación de producto: tortilla redonda Ø 24 cm aprox., cocción a fuego medio "
        "6–7 min de referencia + 1 min de reposo (ajustar por equipo y gramaje). "
        "Estándar de calidad: jugosa por dentro, dorada por fuera."
    )
    if CARTA.exists():
        pdf.img_safe(CARTA, w=120)
        pdf.set_font("Body", "I", 8)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 5, "Figura: referencia de carta / recetas TortiClub", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(2)

    pdf.h2("4.1 Sabores activos (catálogo)")
    pdf.table(
        ["#", "Sabor", "Alérgenos principales"],
        [
            ["1", "La Clásica", "Huevo"],
            ["2", "Chorizo Picante", "Huevo; trazas cerdo"],
            ["3", "Cebolla Caramelizada", "Huevo"],
            ["4", "Jamón Ibérico", "Huevo; trazas cerdo"],
        ],
        [15, 70, 101],
    )

    pdf.h2("4.2 Ficha técnica base — La Clásica (ejemplo de trabajo)")
    pdf.p(
        "Los gramajes siguientes son punto de partida de obrador (1 pieza Ø 24 cm). "
        "Deben pesarse y calibrarse en cocina real; se registran en hoja de APPCC."
    )
    pdf.table(
        ["Ingrediente", "Gramaje orientativo", "Función"],
        [
            ["Huevo campero", "280–320 g (≈5–6 ud)", "Estructura / jugosidad"],
            ["Patata", "350–420 g netos", "Cuerpo"],
            ["Cebolla", "80–120 g", "Dulzor"],
            ["AOVE", "60–90 ml", "Pochar + sabor"],
            ["Sal", "4–6 g", "Sazón"],
        ],
        [55, 55, 76],
    )
    pdf.h3("Procedimiento general (todos los sabores)")
    for i, step in enumerate(
        [
            "Recepción y control de temperatura de materias primas (frío ≤ 4 °C cuando aplique).",
            "Lavado de manos, vestuario y zona limpia según plan de higiene.",
            "Pelar y cortar patata en láminas finas homogéneas.",
            "Pochar patata (y cebolla si aplica) en AOVE a fuego medio hasta tierna, sin quemar.",
            "Escurrir exceso de aceite; reservar aceite filtrado si se reutiliza según protocolo.",
            "Batir huevos; mezclar con patata/cebolla y sal al punto de marca.",
            "Añadir el ingrediente diferencial (chorizo / jamón / cebolla caramelizada extra) según ficha.",
            "Cuajar en sartén o molde controlado 6–7 min orientativos; voltear o terminar en plancha/horno según equipo.",
            "Reposo 1 min; control visual de color y textura (checklist QC).",
            "Envasado en packaging de marca; etiqueta con fecha/hora, alérgenos y consumo preferente < 24 h refrigerado.",
        ],
        1,
    ):
        pdf.bullet(f"{i}. {step}")

    pdf.h2("4.3 Variaciones por sabor")
    pdf.h3("Chorizo picante")
    pdf.p(
        "Añadir 60–90 g de chorizo picante en dados pochados o salteados brevemente "
        "para soltar grasa y aroma. Vigilar sal global (el chorizo ya aporta sodio)."
    )
    pdf.h3("Cebolla caramelizada")
    pdf.p(
        "Cebolla extra 120–160 g cocinada a fuego lento hasta color ámbar (20–40 min). "
        "No quemar: el amargor rompe el estándar de marca."
    )
    pdf.h3("Jamón ibérico")
    pdf.p(
        "40–70 g de tacos o virutas de calidad. Incorporar al final para no resecar. "
        "Coste alto: proteger margen con PVP 12,90 € SOLO y control de merma."
    )

    pdf.h2("4.4 Formatos de venta y montaje")
    pdf.bullet("SOLO: 1 tortilla entera, 1 sabor.")
    pdf.bullet("DUO: 1 tortilla, corte en 2 mitades, 2 sabores (mitad y mitad o dos cocciones unidas según operativa).")
    pdf.bullet("CLUB: 4 cuartos / 4 sabores — máxima complejidad operativa; planificar tiempos de línea.")
    pdf.note(
        "Decisión operativa crítica: fabricar 4 mini-tortillas de cuarto vs. una tortilla "
        "multicapa. La primera facilita control de cocción y alérgenos; la segunda es más "
        "espectacular visualmente. Documentar la elegida en el manual y formar al equipo."
    )

    pdf.h2("4.5 Alérgenos y etiquetado (Reglamento UE 1169/2011)")
    pdf.p(
        "Declarar siempre huevo. Declarar o advertir trazas de cerdo cuando haya chorizo/jamón. "
        "Si hay riesgo de contaminación cruzada en la misma plancha/utensilios, incluir "
        "advertencia. Mantener ficha de alérgenos actualizada y accesible al personal y en web."
    )
    pdf.bullet("Etiqueta mínima: denominación, lista de ingredientes, alérgenos destacados, fecha/hora de elaboración, condiciones de conservación, razón social y dirección, modo de empleo si aplica.")
    pdf.bullet("Idioma: castellano (y catalán recomendable en BCN).")

    pdf.h2("4.6 Conservación y seguridad alimentaria")
    pdf.bullet("Conservar entre 2 °C y 4 °C.")
    pdf.bullet("Consumir preferentemente en menos de 24 horas.")
    pdf.bullet("Cadena de frío en delivery: bolsas térmicas, tiempos máximos de ruta.")
    pdf.bullet("Descarte de producto fuera de tiempo o con defecto visual/sensorial (sin negociación).")

    # ——— 5 ———
    pdf.add_page()
    pdf.h1("5. Brand Book — sistema de identidad")
    if LOGO.exists():
        pdf.img_safe(LOGO, w=40)
    pdf.h2("5.1 Esencia")
    pdf.p(
        "TortiClub no vende solo tortillas: vende compartir. El tono es cercano, "
        "divertido, directo y honesto. Elegante sin ser frío. Nunca grita."
    )
    pdf.h2("5.2 Mantra (inmutable)")
    pdf.set_font("Body", "B", 14)
    pdf.cell(0, 8, "Parte. Comparte. Repite.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(2)
    pdf.p("No se explica. No se alarga. Aparece en packaging, web, IG y firmas.")
    pdf.h2("5.3 Colores")
    pdf.table(
        ["Token", "HEX", "Uso"],
        [
            ["Cream / surface", "#F7F3E8", "Fondos"],
            ["Yellow / primary", "#FFD23F", "Mascota, acentos, CTAs"],
            ["Ink / black", "#111111", "Texto, iconos"],
        ],
        [50, 40, 96],
    )
    pdf.h2("5.4 Tipografía")
    pdf.p(
        "Referencia de marca: PP Neue Montreal (Medium/Bold). En web se usa Outfit "
        "como alternativa libre de calidad similar. Evitar tipografías de restaurante "
        "cliché o script excesivo salvo acentos puntuales."
    )
    pdf.h2("5.5 Logo y mascota")
    pdf.bullet("Wordmark: torticlub en minúsculas, bold, sin espacios.")
    pdf.bullet("Símbolo: círculo amarillo con dos ojos (personaje, no emoji decorativo).")
    pdf.bullet("Los ojos observan, reaccionan y acompañan; nunca distraen del producto.")
    pdf.h2("5.6 Fotografía y packaging")
    pdf.bullet("Producto como objeto de deseo (fondo limpio, luz suave), no food-porn de restaurante.")
    pdf.bullet("Packaging crema, caja con mensaje «bienvenido al club», tarjeta de agradecimiento.")
    pdf.bullet("Pegatinas circulares con mantra en arco.")
    if (WEB_BRAND / "pack-box-open.jpg").exists():
        pdf.img_safe(WEB_BRAND / "pack-box-open.jpg", w=70)
    pdf.h2("5.7 Copywriting")
    pdf.bullet("Frases cortas. Microcopy con personalidad de Club.")
    pdf.bullet("Prohibido: «nuestras deliciosas tortillas…», tono infantil, postureo startup.")
    pdf.bullet("Ejemplos: «Entra al Club», «Ya hay sitio para ti», «Hoy toca tortilla».")

    # ——— 6 ———
    pdf.add_page()
    pdf.h1("6. Precios, costes unitarios y márgenes")
    pdf.h2("6.1 Estructura de coste de una tortilla (estimación)")
    pdf.p(
        "Escenario base de coste de materia prima + packaging directo por unidad. "
        "No incluye personal, alquiler ni marketing."
    )
    pdf.table(
        ["Concepto", "Clásica €", "Especial €", "Jamón €"],
        [
            ["Materia prima", "2,10–2,80", "2,60–3,40", "3,40–4,80"],
            ["Packaging + etiqueta", "0,60–1,10", "0,60–1,10", "0,60–1,10"],
            ["Coste variable total", "2,70–3,90", "3,20–4,50", "4,00–5,90"],
            ["PVP SOLO", "9,90", "11,90", "12,90"],
            ["Margen bruto aprox.", "60–73%", "62–73%", "54–69%"],
        ],
        [50, 42, 42, 42],
    )
    pdf.note(
        "DUO y CLUB tienen más complejidad y posible merma de tiempo: el PVP 12,90 / 14,90 "
        "debe absorber mano de obra extra. Si el CLUB se fabrica como 4 cuartos independientes, "
        "calcular coste como suma de cuartos + packaging único."
    )
    pdf.h2("6.2 Impacto de comisiones delivery")
    pdf.table(
        ["Canal", "Comisión orientativa", "Efecto"],
        [
            ["Web + mensajero propio", "coste fijo/ruta", "Mejor margen si hay densidad"],
            ["Glovo / Uber / Just Eat", "25–40% + marketing", "Subir PVP en app o menú limitado"],
            ["Recogida en local", "0%", "Incentivar con pequeño beneficio"],
        ],
        [55, 55, 76],
    )
    pdf.h2("6.3 Ticket medio objetivo")
    pdf.bullet("Mix saludable: 40% SOLO / 35% DUO / 25% CLUB → ticket medio ≈ 12–14 €.")
    pdf.bullet("Upsell: bebida/merch solo si no ensucia la marca (fase 2).")

    # ——— 7 ———
    pdf.add_page()
    pdf.h1("7. Manual de operaciones")
    pdf.h2("7.1 Flujo del pedido (estado actual del producto digital)")
    for s in [
        "Cliente configura en web (formato, sabores, cantidad, entrega, datos).",
        "Hold-to-confirm: el pedido entra en panel admin con estado «pendiente».",
        "Equipo contacta por WhatsApp en 5–10 min para confirmar.",
        "Cocina avanza estados: confirmado → en cocina → listo → entregado.",
        "Si no hay stock: mensaje de marca + reserva para mañana.",
    ]:
        pdf.bullet(s)
    pdf.h2("7.2 Roles mínimos de arranque")
    pdf.table(
        ["Rol", "Responsabilidad", "Dedicación inicial"],
        [
            ["Fundador / marca", "Calidad, IG, decisiones", "Full-time"],
            ["Cocina", "Producción y QC", "Part-time → full"],
            ["Atención WhatsApp", "Confirmaciones y upsell suave", "Part-time"],
            ["Reparto", "Rutas o partner", "Bolsas / bajo demanda"],
            ["Asesoría externa", "Fiscal + laboral", "Mensual"],
        ],
        [45, 80, 61],
    )
    pdf.h2("7.3 Apertura y cierre de turno (checklist)")
    pdf.bullet("Temperaturas de neveras registradas.")
    pdf.bullet("Stock del día cargado en panel admin.")
    pdf.bullet("Limpieza de superficies, sartenes, tablas (código de colores).")
    pdf.bullet("Revisión de pedidos pendientes y reservas de mañana.")
    pdf.bullet("Cierre de caja / cuadre de pedidos vs. cobros.")
    pdf.bullet("Residuos y aceite usado según normativa.")
    pdf.h2("7.4 Control de calidad (QC)")
    pdf.bullet("Color exterior dorado homogéneo, sin quemaduras negras.")
    pdf.bullet("Corte de prueba: centro jugoso, no crudo líquido ni seco.")
    pdf.bullet("Peso dentro de tolerancia ±5–8% del estándar.")
    pdf.bullet("Packaging limpio, etiqueta legible, sin fugas de aceite.")
    pdf.bullet("Foto de referencia de «tortilla perfecta» visible en cocina.")
    pdf.h2("7.5 Higiene y APPCC (resumen)")
    pdf.p(
        "Todo obrador alimentario debe implantar un sistema basado en el Análisis "
        "de Peligros y Puntos de Control Crítico (APPCC / HACCP), con planes de "
        "limpieza, control de plagas, agua, formación, trazabilidad y control de "
        "temperaturas. En Cataluña, el marco se alinea con normativa europea y "
        "requisitos autonómicos de seguridad alimentaria."
    )
    pdf.bullet("Formación en manipulación de alimentos del personal.")
    pdf.bullet("Registro de temperaturas (nevera, producto, entrega).")
    pdf.bullet("Trazabilidad de lotes de huevo, cárnicos y aceite.")
    pdf.bullet("Plan de limpieza y desinfección diario/semanal.")
    pdf.bullet("Gestión de alérgenos y contaminación cruzada.")

    # ——— 8 ———
    pdf.add_page()
    pdf.h1("8. Legal, fiscal, seguros y marca")
    pdf.h2("8.1 Autorización sanitaria y actividad")
    pdf.p(
        "Para elaborar y vender comida debe declararse y autorizarse la actividad "
        "alimentaria según el tipo de establecimiento (cocina central, obrador, "
        "take away, etc.). En Barcelona se interrelacionan licencias municipales "
        "de actividad y requisitos sanitarios. Un técnico o gestor especializado "
        "en hostelería es altamente recomendable desde el día 0."
    )
    pdf.bullet("Alta de actividad económica y licencia de actividad / comunicación previa según caso.")
    pdf.bullet("Registro sanitario o inscripción que corresponda al tipo de obrador.")
    pdf.bullet("Cumplimiento de normas de etiquetado y publicidad de alimentos.")
    pdf.bullet("Normativa de residuos y aceites.")
    pdf.bullet("Prevención de riesgos laborales si hay empleados.")
    pdf.h2("8.2 Formas jurídicas")
    pdf.table(
        ["Forma", "Pros", "Contras"],
        [
            ["Autónomo", "Rápido, simple", "Responsabilidad ilimitada, IRPF"],
            ["SL", "Patrimonio separado, imagen seria", "Coste constitución y contabilidad"],
            ["SL + autónomo societario", "Escalable", "Más complejidad"],
        ],
        [45, 70, 71],
    )
    pdf.p(
        "Para un food brand con intención de crecer, la SL suele ser preferible "
        "a medio plazo. En el arranque validatorio, algunos emprendedores empiezan "
        "como autónomos y migran a SL al superar umbrales de riesgo o facturación."
    )
    pdf.h2("8.3 Fiscalidad (orientativa España)")
    pdf.bullet("IVA: tipo general o reducido según clasificación exacta del producto y servicio — confirmar con gestor (delivery de comida elaborada suele llevar IVA de restauración/servicios según caso).")
    pdf.bullet("IRPF o Impuesto de Sociedades según forma jurídica.")
    pdf.bullet("Retenciones si hay profesionales freelancers.")
    pdf.bullet("Modelos periódicos (303, 130/131, 111, 190, etc.) según situación.")
    pdf.note(
        "No fijar la estructura de IVA sin consulta: un error de tipo impositivo "
        "en hostelería/delivery es caro de corregir."
    )
    pdf.h2("8.4 Protección de marca")
    pdf.bullet("Búsqueda de anterioridades en OEPM (España) y EUIPO (UE).")
    pdf.bullet("Registro de la marca «TortiClub» (nominativa + logo si procede) en clase 43 (servicios de restauración) y/o 29/30 (alimentos) según estrategia.")
    pdf.bullet("Dominios: torticlub.com / torticlubworld.com — asegurar propiedad.")
    pdf.bullet("RRSS: @torticlub unificado.")
    pdf.bullet("Copyright de textos e imágenes; contratos con fotógrafos y diseñadores (cesión de derechos).")
    pdf.h2("8.5 Seguros recomendados")
    pdf.table(
        ["Seguro", "Para qué", "Orden de coste/año*"],
        [
            ["RC explotación / productos", "Intoxicación, reclamaciones", "300–1.200 €"],
            ["Continente/contenido", "Local y equipo", "según local"],
            ["Baja laboral autónomo", "Ingresos si enfermas", "variable"],
            ["Ciber (fase 2)", "Datos de clientes", "100–400 €"],
        ],
        [55, 70, 61],
    )
    pdf.set_font("Body", "I", 8)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, "*Estimaciones muy orientativas; pedir 3 pólizas comparables.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(2)
    pdf.h2("8.6 RGPD y datos de clientes")
    pdf.bullet("Textos legales en web: privacidad, cookies, condiciones de compra.")
    pdf.bullet("Base legítima: ejecución de contrato (pedido) e interés legítimo limitado.")
    pdf.bullet("No usar el teléfono de clientes para spam; solo gestión del pedido y, con consentimiento, marketing.")
    pdf.bullet("Acceso al panel admin protegido (ya implementado con sesión).")
    pdf.h2("8.7 Propiedad intelectual de la web")
    pdf.p(
        "El código y el diseño de torticlubworld.vercel.app deben documentarse como "
        "activo de la empresa. Mantener repositorio privado y accesos controlados."
    )

    # ——— 9 ———
    pdf.add_page()
    pdf.h1("9. Estructura de arranque y costes base")
    pdf.h2("9.1 Escenarios de cocina")
    pdf.h3("A) Cocina compartida / cloud kitchen")
    pdf.bullet("Menor CAPEX; alquiler por horas o puesto mensual.")
    pdf.bullet("Ideal para validar sin fianza de local grande.")
    pdf.bullet("Coste orientativo BCN: 400–1.500 €/mes según horas y ubicación.")
    pdf.h3("B) Local take-away propio en Sant Andreu")
    pdf.bullet("Control total de marca y operativa.")
    pdf.bullet("CAPEX de reforma + licencia puede ir de 8.000 a 60.000+ € según estado del local.")
    pdf.bullet("Alquiler barrio: rangos muy variables (consultar portales y agentes).")
    pdf.h3("C) Producción en cocina de un partner hostelería")
    pdf.bullet("Contrato de maquila / servicio de cocina.")
    pdf.bullet("Cuidar exclusividad y estándares QC por escrito.")
    pdf.h2("9.2 Inversión inicial orientativa (escenario lean)")
    pdf.table(
        ["Partida", "Rango €"],
        [
            ["Constitución + gestor arranque", "300–1.500"],
            ["Registro de marca (España)", "150–400 tasas + agente"],
            ["Equipo cocina básico", "1.500–8.000"],
            ["Packaging inicial (cajas, pegatinas, tarjetas)", "400–1.500"],
            ["Web (ya construida) + dominio + mantenimiento", "20–80/mes + dominio"],
            ["Seguros primer año", "300–1.500"],
            ["Licencias / técnico / legal", "500–3.000"],
            ["Marketing lanzamiento (ads + foto)", "300–2.000"],
            ["Fondo de maniobra (2–3 meses gastos)", "3.000–12.000"],
            ["TOTAL lean orientativo", "6.000–30.000+"],
        ],
        [120, 66],
    )
    pdf.note(
        "Un local con obra y extracciones eleva el total con facilidad por encima "
        "de 40–80k €. Para TortiClub, validar en cocina compartida reduce riesgo."
    )

    # ——— 10 ———
    pdf.add_page()
    pdf.h1("10. Barcelona Activa y ecosistema de apoyo")
    pdf.p(
        "Barcelona Activa es el desarrollo económico del Ayuntamiento de Barcelona. "
        "Ofrece orientación para emprender, formación, espacios y programas de "
        "acompañamiento. Conviene citar cita de asesoramiento personalizado y "
        "revisar convocatorias vigentes (cambian cada año)."
    )
    pdf.h2("10.1 Qué pedir / explorar en Barcelona Activa")
    pdf.bullet("Asesoramiento de modelo de negocio y plan de empresa.")
    pdf.bullet("Formación en gestión, marketing digital y finanzas básicas.")
    pdf.bullet("Información sobre financiación y ayudas municipales/autonómicas abiertas.")
    pdf.bullet("Networking con otros food startups y proveedores locales.")
    pdf.bullet("Revisión del plan financiero por un técnico de emprendimiento.")
    pdf.h2("10.2 Otras entidades útiles")
    pdf.bullet("Cámaras de comercio y asociaciones de hostelería de Barcelona.")
    pdf.bullet("Acció / GenCat — internacionalización y competitividad (fases posteriores).")
    pdf.bullet("ENISA / ICO / microcréditos — solo con plan sólido y avales según producto.")
    pdf.bullet("Incubadoras foodtech (p. ej. programas en BCN/Madrid) si se pivota a escala industrial.")
    pdf.bullet("Hubs de cocina compartida y dark kitchens de la ciudad.")
    pdf.h2("10.3 Cómo prepararse para una tutoría")
    pdf.bullet("Llevar este dossier resumido a 10 diapositivas.")
    pdf.bullet("Tener claros: inversión, punto de equilibrio y permisos pendientes.")
    pdf.bullet("Mostrar web y métricas si ya hay pedidos piloto.")
    pdf.bullet("Lista de 5 riesgos y 5 decisiones abiertas.")

    # ——— 11 ———
    pdf.add_page()
    pdf.h1("11. Proveedores y cadena de suministro")
    pdf.h2("11.1 Criterios de selección")
    pdf.bullet("Trazabilidad y facturas formales (imprescindible).")
    pdf.bullet("Proximidad (frescura + huella + relación).")
    pdf.bullet("Estabilidad de calibre (huevo, patata) para receta constante.")
    pdf.bullet("Condiciones de pago 7–30 días al estabilizar volumen.")
    pdf.bullet("Plan B para cada ingrediente crítico.")
    pdf.h2("11.2 Mapa de proveedores propuestos (Barcelona)")
    pdf.table(
        ["Categoría", "Opciones tipo", "Notas"],
        [
            ["Huevos", "Granjas catalanas, distribuidores HORECA", "Preferir campero"],
            ["Patata/cebolla", "Mercabarna, fruta-verdura mayorista", "Visitar madrugadas"],
            ["AOVE", "Cooperativas / marca hostelería", "Cata y acidez"],
            ["Cárnicos", "Charcutería mayorista BCN", "Certificados"],
            ["Packaging", "Raopak, packaging.es, imprentas locales", "Test de grasa"],
            ["Etiquetas", "Imprenta digital corta tirada", "Resistentes a aceite"],
            ["Limpieza", "Distribuidores profesionales", "Fichas de seguridad"],
            ["Reparto", "Flota propia / partners / riders", "Térmico obligatorio"],
        ],
        [40, 70, 76],
    )
    pdf.h2("11.3 Packaging — proveedores y specs")
    pdf.bullet("Caja crema resistente a grasa, tamaño tortilla 24 cm + holgura.")
    pdf.bullet("Separadores si DUO/CLUB lo requieren.")
    pdf.bullet("Tarjeta de agradecimiento (offset o digital).")
    pdf.bullet("Pegatina de cierre con ojos / mantra.")
    pdf.bullet("Bolsa de papel o tote para pedidos múltiples.")
    pdf.p(
        "Pedir muestras físicas antes de tiradas grandes. Un packaging que se "
        "ablanda con el aceite destruye la percepción premium."
    )
    pdf.h2("11.4 Stock y mermas")
    pdf.bullet("Inventario diario de formatos y sabores (ya soportado en panel admin).")
    pdf.bullet("Merma objetivo de materia prima < 5–8%.")
    pdf.bullet("Producto no vendido: política clara (personal / descarte / nunca reventa dudosa).")

    # ——— 12 ———
    pdf.add_page()
    pdf.h1("12. Canales de venta y marketplaces")
    pdf.h2("12.1 Web propia (prioridad)")
    pdf.p(
        "La web TortiClub es el canal de marca: configurador, carta, reservas y "
        "admin. Comisión 0% sobre el pedido. Coste: hosting Vercel, dominio, "
        "tiempo de mantenimiento."
    )
    pdf.bullet("URL actual de producto: torticlubworld.vercel.app")
    pdf.bullet("Pedido con hold-to-confirm; confirmación humana por WhatsApp 5–10 min.")
    pdf.bullet("SEO local: «tortilla Barcelona», «tortilla a domicilio Sant Andreu».")
    pdf.h2("12.2 WhatsApp Business")
    pdf.bullet("Cuenta Business con catálogo opcional y mensajes rápidos.")
    pdf.bullet("Horario de atención público.")
    pdf.bullet("Plantillas de confirmación, en camino, entregado.")
    pdf.bullet("No usar para spam; solo servicio y, con permiso, novedades.")
    pdf.h2("12.3 Glovo, Uber Eats, Just Eat")
    pdf.h3("Ventajas")
    pdf.bullet("Demanda instalada y descubrimiento de clientes nuevos.")
    pdf.bullet("Logística resuelta (en la mayoría de modelos).")
    pdf.h3("Inconvenientes")
    pdf.bullet("Comisiones altas (a menudo 25–40%).")
    pdf.bullet("Menos control de marca y de la experiencia de unboxing.")
    pdf.bullet("Dependencia del algoritmo y de promos pagadas.")
    pdf.h3("Recomendación estratégica")
    pdf.p(
        "Fase 1 (0–3 meses): solo web + WhatsApp + recogida/envío propio en radio corto. "
        "Fase 2: entrar en 1 marketplace con menú reducido (SOLO clásica + 1 especial + DUO) "
        "y PVP ajustado. Fase 3: optimizar según CAC y margen real por canal."
    )
    pdf.table(
        ["Plataforma", "Acción recomendada", "Cuidado"],
        [
            ["Glovo", "Alta cuando haya capacidad estable", "Fotos de marca propias"],
            ["Uber Eats", "Comparar comisión y zona", "Tiempos de preparación reales"],
            ["Just Eat", "Evaluar cobertura BCN", "Duplicar carta sin diluir"],
        ],
        [40, 80, 66],
    )
    pdf.h2("12.4 Integración técnica futura")
    pdf.bullet("Webhooks o export CSV de pedidos app → panel (o Notion/Sheets al inicio).")
    pdf.bullet("No prometer integración automática hasta tener volumen que lo pague.")

    # ——— 13 ———
    pdf.add_page()
    pdf.h1("13. Marketing, redes y lanzamiento")
    pdf.h2("13.1 Principios de comunicación")
    pdf.bullet("Publicar menos, con calidad de campaña.")
    pdf.bullet("Contenido: producto, unboxing, ojos de marca, barrio, ritual de partir.")
    pdf.bullet("Evitar recetas largas y «detrás de fogones» genérico si no aporta marca.")
    pdf.bullet("UGC: incentivar que el cliente suba la caja/apertura.")
    pdf.h2("13.2 Instagram (@torticlub)")
    pdf.bullet("Bio: mantra + Bienvenido al club + link a web.")
    pdf.bullet("Historias destacadas: Tortillas, Club, Pedidos, Dónde, Novedades.")
    pdf.bullet("Reels cortos: caja → silencio → apertura → corte (10 s).")
    pdf.bullet("Frecuencia inicial: 3–5 posts/semana + stories diarias ligeras.")
    pdf.h2("13.3 Plan de lanzamiento (8 semanas)")
    pdf.table(
        ["Semana", "Hito"],
        [
            ["-4 a -3", "Cierre legal mínimo, seguros, packaging de prueba"],
            ["-2", "Soft launch amigos/familia, 20 pedidos de prueba"],
            ["-1", "Ajustes de receta y tiempos; fotos finales"],
            ["0", "Apertura pública IG + web; 7 días de atención reforzada"],
            ["1–2", "Colaboraciones micro (creators barrio / foodies BCN)"],
            ["3–4", "Primer mes de métricas; decidir marketplace sí/no"],
            ["5–8", "Optimizar menú, horarios y radio de entrega"],
        ],
        [35, 151],
    )
    pdf.h2("13.4 Presupuesto marketing mes 1–3")
    pdf.bullet("Producción de foto/vídeo: 0 € (DIY marca) a 1.500 € (pro).")
    pdf.bullet("Ads Meta: 5–15 €/día en zona BCN si el creativo es fuerte.")
    pdf.bullet("Seeding: 10–20 productos invitados a perfiles afines.")
    pdf.h2("13.5 KPIs de marca")
    pdf.bullet("Pedidos / semana y ticket medio.")
    pdf.bullet("% repetición a 30 y 60 días.")
    pdf.bullet("CAC por canal.")
    pdf.bullet("Tiempo medio de confirmación WhatsApp (objetivo ≤ 10 min en horario).")
    pdf.bullet("Valoraciones y quejas (registro en admin).")

    # ——— 14 ———
    pdf.add_page()
    pdf.h1("14. Plan financiero y provisiones")
    pdf.h2("14.1 Hipótesis de escenario base (mes 6)")
    pdf.table(
        ["Métrica", "Valor"],
        [
            ["Pedidos / día laborable", "18"],
            ["Días de servicio / mes", "22"],
            ["Pedidos / mes", "≈ 396"],
            ["Ticket medio", "13,00 €"],
            ["Ingresos brutos / mes", "≈ 5.150 €"],
            ["Coste variable (35%)", "≈ 1.800 €"],
            ["Margen contribución", "≈ 3.350 €"],
            ["Gastos fijos (alquiler cocina+seguros+móvil+soft)", "1.200–2.500 €"],
            ["Resultado orientativo", "850–2.150 € antes de sueldo completo"],
        ],
        [110, 76],
    )
    pdf.note(
        "Estas cifras son un escenario moderado de validación, no una promesa. "
        "Si los pedidos bajan a 8/día, el negocio no cubre un sueldo digno sin "
        "reducción de fijos o segundo canal de ingresos."
    )
    pdf.h2("14.2 Escenario optimista (mes 12)")
    pdf.bullet("35 pedidos/día × 24 días × 13,5 € ≈ 11.300 €/mes ingresos.")
    pdf.bullet("Permite sueldo + ayudante a tiempo parcial + ads.")
    pdf.h2("14.3 Punto de equilibrio")
    pdf.p(
        "Con fijos de 2.000 €/mes y margen de contribución del 60% sobre ticket 13 € "
        "(≈ 7,8 €/pedido), el break-even ≈ 257 pedidos/mes ≈ 12 pedidos/día en 22 días. "
        "Por debajo de 10 pedidos/día sostenidos, revisar horarios o costes."
    )
    pdf.h2("14.4 Provisiones recomendadas")
    pdf.bullet("Fondo de emergencia 2–3 meses de fijos.")
    pdf.bullet("Provisión de IVA y trimestrales (no gastar el IVA repercutido).")
    pdf.bullet("Provisión de sustitución de equipo (sarténes, plancha, nevera).")
    pdf.bullet("Provisión de mermas y devoluciones (1–3% de ventas).")
    pdf.h2("14.5 Financiación")
    pdf.bullet("Ahorro propio / friends & family (más flexible).")
    pdf.bullet("Microcréditos y líneas ICO solo con plan y capacidad de devolución.")
    pdf.bullet("Evitar endeudarse en obra de local antes de validar demanda.")
    pdf.h2("14.6 Tabla de control mensual (plantilla)")
    pdf.table(
        ["Concepto", "Mes"],
        [
            ["Ingresos web", ""],
            ["Ingresos marketplaces", ""],
            ["Coste de materias", ""],
            ["Packaging", ""],
            ["Personal", ""],
            ["Alquiler cocina", ""],
            ["Marketing", ""],
            ["Comisiones apps", ""],
            ["Resultado", ""],
        ],
        [120, 66],
    )

    # ——— 15 ———
    pdf.add_page()
    pdf.h1("15. Riesgos, oportunidades y roadmap")
    pdf.h2("15.1 Riesgos principales")
    pdf.table(
        ["Riesgo", "Mitigación"],
        [
            ["Intoxicación / crisis sanitaria", "APPCC, formación, seguro RC, protocolo crisis"],
            ["Dependencia de una sola persona", "Recetas documentadas, backup de cocina"],
            ["Comisiones apps", "Priorizar canal propio"],
            ["Subida de costes huevo/AOVE", "Revisión trimestral de PVP"],
            ["Copia de marca", "Registro de marca y vigilancia"],
            ["Mala experiencia delivery", "Radio corto, térmicos, tiempos realistas"],
            ["Quemado de fundador", "Horarios cerrados, no 7×24 al inicio"],
        ],
        [70, 116],
    )
    pdf.h2("15.2 Oportunidades")
    pdf.bullet("Ediciones limitadas de sabor (sin romper el catálogo base).")
    pdf.bullet("Pop-ups en mercados o colaboraciones con cafés de diseño.")
    pdf.bullet("Pack regalo corporativo (oficinas 22@, Poblenou).")
    pdf.bullet("Merch del Club cuando haya comunidad real.")
    pdf.bullet("Expansión a otras ciudades solo con manual de operaciones maduro.")
    pdf.h2("15.3 Roadmap 24 meses")
    pdf.bullet("0–3 m: legal mínimo, soft launch, 100 clientes repetidores.")
    pdf.bullet("3–6 m: estabilizar cocina, decidir local vs. cloud, primer marketplace opcional.")
    pdf.bullet("6–12 m: automatizar más el panel, foto pro, posiblemente 2.ª persona en cocina.")
    pdf.bullet("12–24 m: evaluar segunda zona de reparto o licensing controlado (no franquicia apresurada).")

    # ——— 16 ———
    pdf.add_page()
    pdf.h1("16. Anexos")
    pdf.h2("16.1 Checklist de apertura (resumen)")
    for item in [
        "Definir forma jurídica y alta en Hacienda / SS",
        "Abrir cuenta bancaria de empresa/autónomo",
        "Contratar gestor con experiencia food",
        "Seguro RC + resto",
        "Registro / licencia de actividad y sanitaria",
        "Plan APPCC y formación manipulador",
        "Contrato de cocina/local",
        "Proveedores y fichas de producto",
        "Packaging y etiquetas legales",
        "Registro de marca y dominios",
        "Web en producción + textos legales",
        "WhatsApp Business y protocolo de atención",
        "Soft launch medido",
        "Lanzamiento público",
    ]:
        pdf.bullet(f"[ ]  {item}")

    pdf.h2("16.2 Contactos y recursos (orientativos)")
    pdf.bullet("Barcelona Activa — barcelonactiva.cat")
    pdf.bullet("Ayuntamiento de Barcelona — licencias y actividades")
    pdf.bullet("Agència de Salut Pública de Barcelona / salud alimentaria Catalunya")
    pdf.bullet("OEPM — oepm.es (marcas)")
    pdf.bullet("AEPD — privacidad")
    pdf.bullet("Web TortiClub — torticlubworld.vercel.app")
    pdf.bullet("Instagram — @torticlub")

    pdf.h2("16.3 Glosario breve")
    pdf.bullet("APPCC/HACCP: sistema de seguridad alimentaria.")
    pdf.bullet("Dark kitchen: cocina sin sala, orientada a delivery.")
    pdf.bullet("Ticket medio: ingreso medio por pedido.")
    pdf.bullet("CAC: coste de adquisición de cliente.")
    pdf.bullet("D2C: venta directa al consumidor.")

    # ——— 17 DEEP DIVE LEGAL ———
    pdf.add_page()
    pdf.h1("17. Profundización legal y fiscal (España / Catalunya)")
    pdf.h2("17.1 Pasos administrativos en orden recomendado")
    for i, step in enumerate(
        [
            "Definir forma jurídica (autónomo vs SL) con gestor de hostelería.",
            "Reservar nombre de sociedad (si SL) y preparar estatutos mínimos.",
            "Alta en Hacienda (NIF / NIF-IVA) y epígrafes de actividad (IAE / CNAE hostelería o elaboración de comidas).",
            "Alta en Seguridad Social (RETA si autónomo; régimen general si contratas empleados).",
            "Cuenta bancaria profesional separada de la personal.",
            "Contrato de local / cocina compartida con cláusulas de uso alimentario.",
            "Licencia o comunicación de actividad en el Ayuntamiento de Barcelona según el tipo de establecimiento.",
            "Autorización / registro sanitario que corresponda (consultar ASPB / Agència Catalana de Seguretat Alimentària).",
            "Implantar APPCC documentado y registros diarios.",
            "Pólizas de seguro activas antes del primer servicio de pago.",
            "Textos legales web y política de cookies (RGPD + LSSI).",
            "Registro de marca en OEPM (puede tramitarse en paralelo desde el día 1).",
        ],
        1,
    ):
        pdf.bullet(f"{i}. {step}")
    pdf.h2("17.2 Autónomo: cuotas y realidad 2026")
    pdf.p(
        "El sistema de cotización de autónomos en España se basa en tramos de "
        "rendimientos netos. La cuota mensual varía según ingresos reales (no es "
        "una cifra única fija para todos). En arranque con facturación baja puede "
        "aplicarse tarifa reducida o tramo mínimo según normativa vigente del año. "
        "Confirmar siempre la tabla actual con el gestor: las cuotas cambian."
    )
    pdf.bullet("Presupuesta 200–400 €/mes de cotización en escenarios bajos-medios de validación.")
    pdf.bullet("Añade IRPF trimestral (modelo 130) si no estás en módulos — hostelería suele ir en estimación directa.")
    pdf.bullet("Guarda el 20–30% de cada cobro para impuestos y cotizaciones hasta conocer tu tipo real.")
    pdf.h2("17.3 Sociedad Limitada (SL)")
    pdf.bullet("Capital social mínimo legal en España: verificar normativa vigente (históricamente 3.000 €; hay regímenes de capital reducido con reglas específicas).")
    pdf.bullet("Gastos de notaría + registro + gestoría de constitución: orientativo 400–1.200 €.")
    pdf.bullet("Contabilidad obligatoria, cuentas anuales y mayor rigor formal.")
    pdf.bullet("El administrador puede cotizar como autónomo societario.")
    pdf.bullet("Ventaja clave: limita (en condiciones normales) la responsabilidad al patrimonio de la sociedad.")
    pdf.h2("17.4 IVA y tickets — punto crítico")
    pdf.p(
        "La venta de comida elaborada para llevar o a domicilio puede tributar a "
        "tipos de IVA distintos según se califique el servicio (suministro de "
        "alimentos vs servicio de restaurante). En delivery y take-away la práctica "
        "habitual se confirma con el asesor fiscal caso a caso. Nunca copies el "
        "tipo de IVA de otro local sin análisis."
    )
    pdf.bullet("Emitir factura o ticket completo según obligación y petición del cliente.")
    pdf.bullet("Software de facturación homologado si la normativa de facturación electrónica / Verifactu te aplica en tu tramo y calendario.")
    pdf.bullet("Separar en contabilidad: ventas web, ventas apps, propinas si las hubiera.")
    pdf.h2("17.5 Laboral (si contratas)")
    pdf.bullet("Contrato escrito, alta previa en SS, convenio colectivo de hostelería aplicable en Barcelona/Catalunya.")
    pdf.bullet("Registro de jornada, prevención de riesgos, EPIs y formación.")
    pdf.bullet("En arranque: valorar ayuda familiar regulada o colaboración solo con cobertura legal clara (evitar economía sumergida).")
    pdf.h2("17.6 Propiedad industrial — presupuesto de marca")
    pdf.table(
        ["Acción", "Coste orientativo", "Plazo"],
        [
            ["Búsqueda de anterioridades", "0–150 €", "1–3 días"],
            ["Marca España (1 clase) tasas", "~120–200 €", "meses de concesión"],
            ["Agente de propiedad industrial", "200–600 €", "opcional"],
            ["Marca UE (si escalas)", "más alto", "cuando haya tracción"],
            ["Vigilancia de marca", "50–200 €/año", "recomendable"],
        ],
        [70, 55, 61],
    )
    pdf.note(
        "Registra al menos la denominación TORTICLUB en las clases de productos "
        "alimenticios y servicios de restauración que te indiquen en OEPM/agente. "
        "El logo de ojos puede protegerse como marca figurativa."
    )

    # ——— 18 SOPs ———
    pdf.add_page()
    pdf.h1("18. Manual de operaciones ampliado (SOPs)")
    pdf.h2("18.1 SOP — Recepción de mercancía")
    for s in [
        "Comprobar albarán vs. pedido (cantidad, lote, caducidad).",
        "Medir temperatura de productos refrigerados a la llegada; rechazar si > 7 °C de forma reiterada o fuera de política.",
        "Etiquetar con fecha de entrada y FIFO (primero en entrar, primero en salir).",
        "Almacenar huevos, cárnicos y vegetales en zonas separadas o en envases cerrados.",
        "Registrar incidencias de proveedor (retrasos, roturas, calidad).",
    ]:
        pdf.bullet(s)
    pdf.h2("18.2 SOP — Mise en place diaria")
    pdf.bullet("Calcular producción del día según reservas + histórico del mismo día de la semana + stock admin.")
    pdf.bullet("Pelar y cortar solo lo necesario (máximo X kg de patata prep según capacidad).")
    pdf.bullet("Preparar base de cebolla caramelizada en lote matinal si el menú lo incluye.")
    pdf.bullet("Verificar aceite limpio / ciclos de filtrado documentados.")
    pdf.bullet("Montar estación: sartenes, moldes, balanza, termómetro, packaging, etiquetas del día.")
    pdf.h2("18.3 SOP — Producción de pedido SOLO")
    for i, s in enumerate(
        [
            "Leer ticket: sabor, notas, hora promesa, canal.",
            "Pesar ingredientes según ficha del sabor.",
            "Cocinar según procedimiento general; cronometrar.",
            "QC visual + peso; si falla, desechar o reclasificar (nunca forzar).",
            "Envasar en caja de marca, secar exceso de grasa con papel si hace falta (sin resecar).",
            "Pegar etiqueta con hora, sabor, alérgenos, consumo < 24 h.",
            "Introducir tarjeta de agradecimiento y cerrar con pegatina.",
            "Marcar pedido «listo» en admin; avisar a reparto o cliente de recogida.",
        ],
        1,
    ):
        pdf.bullet(f"{i}. {s}")
    pdf.h2("18.4 SOP — DUO y CLUB")
    pdf.p(
        "DUO y CLUB son el diferencial de marca y el mayor riesgo de retrasos. "
        "Regla: no aceptar más CLUB en paralelo que la capacidad de sartenes/tiempo "
        "permita sin superar el SLA de entrega."
    )
    pdf.bullet("Opción recomendada de arranque: 2 o 4 cocciones de cuarto/mitad estandarizadas y ensambladas en caja con separador.")
    pdf.bullet("Etiqueta debe listar TODOS los sabores del pedido.")
    pdf.bullet("Tiempo objetivo cocina: SOLO ≤ 12 min, DUO ≤ 18 min, CLUB ≤ 25 min (ajustar con datos reales).")
    pdf.h2("18.5 SOP — Delivery y cadena de frío")
    pdf.bullet("Bolsa térmica precalentada o preacondicionada; producto no va suelto en mochila de rider genérico sin protección.")
    pdf.bullet("Radio inicial sugerido: 3–5 km desde Sant Andreu o zona de cocina.")
    pdf.bullet("Tiempo máximo puerta a puerta objetivo: 25–40 min según tráfico.")
    pdf.bullet("Si el cliente no está: protocolo de llamada + 5 min de espera + política de reintento/cobro.")
    pdf.bullet("Foto de entrega opcional en casos dudosos (respetando privacidad).")
    pdf.h2("18.6 SOP — Crisis e incidencia alimentaria")
    pdf.bullet("Parar ventas del lote afectado de inmediato.")
    pdf.bullet("Conservar muestras y registros de temperatura/lote.")
    pdf.bullet("Contactar con el cliente afectado con empatía y sin admitir culpas legales improvisadas; escalar a seguro/gestor si es grave.")
    pdf.bullet("Aviso a autoridades solo según obligación legal y consejo profesional.")
    pdf.bullet("Post-mortem escrito en 48 h: causa, acción correctiva, formación.")
    pdf.h2("18.7 Turnos y horarios de marca")
    pdf.p(
        "Mejor 4 días potentes bien ejecutados que 7 días mediocres. Propuesta de "
        "arranque: jueves a domingo comida y/o cena, o viernes–domingo + un día midweek. "
        "Publicar horarios en web e IG y no aceptar pedidos fuera de franja (protege calidad)."
    )
    pdf.table(
        ["Franja ejemplo", "Uso"],
        [
            ["Jue–Vi 19:00–22:30", "Cena delivery / recogida"],
            ["Sáb–Dom 13:00–16:00 y 19:00–22:30", "Pico social"],
            ["Lun–Mi (opcional)", "Producción de base / descanso / B2B"],
        ],
        [70, 116],
    )

    # ——— 19 FICHAS ———
    pdf.add_page()
    pdf.h1("19. Fichas técnicas completas por sabor")
    pdf.p(
        "Cada ficha debe vivir también en cocina plastificada. Los gramajes son "
        "punto de partida de obrador para 1 pieza Ø 24 cm; calibrar con balanza "
        "y anotar la versión firmada (v1.0, v1.1…)."
    )
    pdf.h2("19.1 La Clásica — ficha maestra")
    pdf.table(
        ["Campo", "Especificación"],
        [
            ["Nombre comercial", "La Clásica"],
            ["Código interno", "TC-CLA-01"],
            ["Diámetro", "24 cm ± 1 cm"],
            ["Peso final objetivo", "550–650 g"],
            ["Huevo", "300 g (±20 g)"],
            ["Patata neta pochada", "380 g"],
            ["Cebolla", "100 g"],
            ["AOVE de poché", "70 ml (absorción variable)"],
            ["Sal", "5 g"],
            ["Alérgenos", "Huevo"],
            ["PVP SOLO", "9,90 €"],
            ["Vida útil", "< 24 h en refrigeración 2–4 °C"],
        ],
        [55, 131],
    )
    pdf.h2("19.2 Chorizo Picante — ficha")
    pdf.table(
        ["Campo", "Especificación"],
        [
            ["Código", "TC-CHO-01"],
            ["Base", "Clásica menos 20 g patata para equilibrar"],
            ["Chorizo picante", "70 g en dados, salteado 1–2 min"],
            ["Sal final", "Probar; suele bastar 3–4 g extra"],
            ["Alérgenos", "Huevo; contiene cerdo"],
            ["PVP SOLO", "11,90 €"],
            ["Notas QC", "Sin trozos quemados; picante medio-marca"],
        ],
        [55, 131],
    )
    pdf.h2("19.3 Cebolla Caramelizada — ficha")
    pdf.table(
        ["Campo", "Especificación"],
        [
            ["Código", "TC-CEB-01"],
            ["Cebolla total", "200–220 g (incluye caramelizado lento)"],
            ["Tiempo caramelizado", "25–40 min fuego bajo"],
            ["Azúcar añadido", "0 g preferible; solo si hace falta 2–3 g"],
            ["Alérgenos", "Huevo"],
            ["PVP SOLO", "11,90 €"],
            ["Riesgo", "Amargor por quemado — descarte obligatorio"],
        ],
        [55, 131],
    )
    pdf.h2("19.4 Jamón Ibérico — ficha")
    pdf.table(
        ["Campo", "Especificación"],
        [
            ["Código", "TC-JAM-01"],
            ["Jamón ibérico", "50–65 g tacos/virutas calidad"],
            ["Incorporación", "Último minuto / no sobrecocer"],
            ["Coste MP objetivo", "≤ 4,80 €"],
            ["Alérgenos", "Huevo; contiene cerdo"],
            ["PVP SOLO", "12,90 €"],
            ["Posicionamiento", "Sabor hero / premium del Club"],
        ],
        [55, 131],
    )
    pdf.h2("19.5 Tabla de alérgenos consolidada (14 UE)")
    pdf.p(
        "De los 14 alérgenos de declaración obligatoria en la UE, el producto base "
        "declara HUEVO. El resto se marca como ausente o posible traza según el "
        "obrador real (harinas, lácteos en la misma cocina, etc.). Actualizar si "
        "se introduce pan, salsas o postres."
    )
    pdf.table(
        ["Alérgeno", "Clásica", "Chorizo", "Cebolla", "Jamón"],
        [
            ["Gluten", "No*", "No*", "No*", "No*"],
            ["Crustáceos", "No", "No", "No", "No"],
            ["Huevos", "SÍ", "SÍ", "SÍ", "SÍ"],
            ["Pescado", "No", "No", "No", "No"],
            ["Cacahuetes", "No", "No", "No", "No"],
            ["Soja", "No*", "No*", "No*", "No*"],
            ["Lácteos", "No*", "No*", "No*", "No*"],
            ["Frutos de cáscara", "No", "No", "No", "No"],
            ["Apio", "No", "No", "No", "No"],
            ["Mostaza", "No", "No", "No", "No"],
            ["Sésamo", "No", "No", "No", "No"],
            ["Sulfitos", "No*", "Revisar chorizo", "No*", "No*"],
            ["Altramuces", "No", "No", "No", "No"],
            ["Moluscos", "No", "No", "No", "No"],
        ],
        [40, 36, 36, 37, 37],
    )
    pdf.set_font("Body", "I", 8)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, "*Verificar contaminación cruzada real del obrador y fichas de proveedor.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # ——— 20 BRAND EXT ———
    pdf.add_page()
    pdf.h1("20. Brand Book ampliado y sistema visual")
    if LOGO.exists():
        pdf.img_safe(LOGO, w=45)
    if LOGO_LOCK.exists():
        pdf.img_safe(LOGO_LOCK, w=55)
    pdf.h2("20.1 Personalidad de marca (arquetipo)")
    pdf.p(
        "TortiClub se comporta como un anfitrión moderno: hospitalario, con humor "
        "seco, sin postureo. No es chef estrella ni marca infantil. Es un club al "
        "que entras cuando quieres algo bueno para compartir sin fricción."
    )
    pdf.bullet("Voz: tuteo natural, frases cortas, confianza.")
    pdf.bullet("No usamos: jerga corporativa, emojis excesivos, mayúsculas agresivas.")
    pdf.bullet("Sí usamos: «Club», «Parte», «Hoy toca», «Ya hay sitio para ti».")
    pdf.h2("20.2 Clear space y usos del logo")
    pdf.bullet("Respetar margen mínimo alrededor del wordmark (altura de la «t» aprox.).")
    pdf.bullet("No distorsionar, no recolorar fuera de la paleta, no añadir sombras baratas.")
    pdf.bullet("Fondo preferente: cream #F7F3E8 o negro #111111 con logo en crema/amarillo.")
    pdf.bullet("El símbolo de ojos puede vivir solo en avatares, pegatinas y favicon.")
    pdf.h2("20.3 Aplicaciones")
    pdf.table(
        ["Soporte", "Elementos obligatorios"],
        [
            ["Caja de producto", "Logo o ojos + mensaje de bienvenida"],
            ["Tarjeta", "Mantra + agradecimiento corto"],
            ["Pegatina", "Mantra en arco o ojos"],
            ["Web", "Paleta exacta + Outfit/PP Neue Montreal"],
            ["IG feed", "Fondos cream, producto hero, poco texto en imagen"],
            ["Uniforme (fase 2)", "Negro + bordado amarillo mínimo"],
        ],
        [50, 136],
    )
    if (WEB_BRAND / "pack-box-closed.jpg").exists():
        pdf.img_safe(WEB_BRAND / "pack-box-closed.jpg", w=55)
    if (WEB_BRAND / "pack-card.jpg").exists():
        pdf.img_safe(WEB_BRAND / "pack-card.jpg", w=55)
    pdf.h2("20.4 Do / Don't")
    pdf.bullet("DO: foto de producto limpia, unboxing, corte jugoso, barrio de Sant Andreu con gusto.")
    pdf.bullet("DO: mostrar los tres formatos SOLO / DUO / CLUB con la misma estética.")
    pdf.bullet("DON'T: stock photos genéricas de tortilla de stock libraries.")
    pdf.bullet("DON'T: menús visuales estilo pizzería con 20 fotos en cuadrícula sucia.")
    pdf.bullet("DON'T: prometer «la mejor de España» sin prueba; preferir «la de compartir».")

    # ——— 21 FINANCE EXT ———
    pdf.add_page()
    pdf.h1("21. Provisiones financieras detalladas")
    pdf.h2("21.1 Cashflow 12 meses (escenario base, € redondeados)")
    pdf.p(
        "Hipótesis: arranque lento, crecimiento orgánico + algo de ads, canal web "
        "dominante, cocina compartida. Cifras de ingresos netos de IVA a efectos "
        "de lectura de negocio (simplificado)."
    )
    pdf.table(
        ["Mes", "Pedidos", "Ingresos", "Variables", "Fijos", "Resultado"],
        [
            ["1", "120", "1.560", "550", "1.800", "-790"],
            ["2", "180", "2.340", "820", "1.800", "-280"],
            ["3", "240", "3.120", "1.090", "1.900", "130"],
            ["4", "280", "3.640", "1.270", "1.900", "470"],
            ["5", "320", "4.160", "1.460", "2.000", "700"],
            ["6", "360", "4.680", "1.640", "2.000", "1.040"],
            ["7", "380", "4.940", "1.730", "2.100", "1.110"],
            ["8", "400", "5.200", "1.820", "2.100", "1.280"],
            ["9", "420", "5.460", "1.910", "2.200", "1.350"],
            ["10", "450", "5.850", "2.050", "2.200", "1.600"],
            ["11", "480", "6.240", "2.180", "2.300", "1.760"],
            ["12", "520", "6.760", "2.370", "2.300", "2.090"],
        ],
        [22, 28, 34, 34, 34, 34],
    )
    pdf.note(
        "El resultado NO es el sueldo neto del fundador: hay que restar IRPF, "
        "cuota de autónomos, reinversión en packaging y posibles imprevistos. "
        "Los meses 1–2 suelen ser de caja negativa: por eso el fondo de maniobra."
    )
    pdf.h2("21.2 CAPEX vs OPEX")
    pdf.table(
        ["Tipo", "Ejemplos TortiClub", "Notas"],
        [
            ["CAPEX", "Sartenes, nevera, selladora, obra menor", "Amortizable"],
            ["OPEX", "Alquiler cocina, MP, ads, seguros, gestor", "Mensual"],
            ["Working capital", "Stock packaging + MP 2 semanas", "No es gasto muerto"],
        ],
        [35, 90, 61],
    )
    pdf.h2("21.3 Escenario lean vs ambicioso (inversión día 0)")
    pdf.table(
        ["Partida", "Lean €", "Ambicioso €"],
        [
            ["Legal + gestor + seguros", "1.200", "3.500"],
            ["Equipo cocina", "2.000", "12.000"],
            ["Packaging + marca física", "800", "4.000"],
            ["Obra / local", "0 (cloud)", "25.000–70.000"],
            ["Marketing 90 días", "600", "4.000"],
            ["Caja de seguridad", "4.000", "15.000"],
            ["TOTAL", "≈ 8.600", "≈ 63.500–108.500"],
        ],
        [70, 50, 66],
    )
    pdf.h2("21.4 Unit economics por canal (ejemplo CLUB 14,90 €)")
    pdf.table(
        ["Concepto", "Web propia", "Marketplace"],
        [
            ["PVP", "14,90", "15,90–16,90 (subir)"],
            ["MP + pack", "-4,50", "-4,50"],
            ["Comisión app", "0", "-35% ≈ -5,50"],
            ["Reparto", "-2,50", "0 (incluido)"],
            ["Contribución", "≈ 7,90", "≈ 5,90–6,90"],
            ["Conclusión", "Prioritario", "Solo con volumen extra"],
        ],
        [50, 68, 68],
    )
    pdf.h2("21.5 Indicadores de salud financiera")
    pdf.bullet("Food cost (MP/ventas) objetivo: 22–32%.")
    pdf.bullet("Packaging / ventas: 4–8%.")
    pdf.bullet("Labor cost cuando haya equipo: 25–35% (peligro si supera 40% sin productividad).")
    pdf.bullet("Cash runway: meses de fijos cubiertos con caja actual.")
    pdf.bullet("Revisión de PVP cada vez que AOVE/huevo suban > 10% sostenido.")

    # ——— 22 MARKET ———
    pdf.add_page()
    pdf.h1("22. Análisis de mercado ampliado (Barcelona)")
    pdf.h2("22.1 Por qué la tortilla y por qué ahora")
    pdf.p(
        "La tortilla de patata es un producto cultural de altísima penetración en "
        "España. Todo el mundo tiene una referencia de precio (bar, casa, "
        "supermercado). Eso es a la vez amenaza (ancla de precio bajo) y oportunidad "
        "(categoría que no hay que explicar). TortiClub no educa sobre «qué es una "
        "tortilla»; educa sobre «cómo se pide y se comparte la nuestra»."
    )
    pdf.h2("22.2 Competidores y alternativas de gasto")
    pdf.bullet("Cena delivery de pizza/hamburguesa 12–20 €: mismo ticket, menos ritual de marca.")
    pdf.bullet("Tortilla de bar 2–4 €/ración: otra ocasión de consumo (menú del día).")
    pdf.bullet("Braseladas / gastrobars: ocasión social en sala, no en casa.")
    pdf.bullet("Meal kits y supermercado: precio y control, cero experiencia Club.")
    pdf.h2("22.3 Análisis «tipo Mercadona» en profundidad")
    pdf.p(
        "Mercadona lidera la cesta de la compra en España con surtido eficiente, "
        "marca blanca fuerte y obsesión por el coste. Lecciones transferibles:"
    )
    pdf.bullet("Surtido corto bien ejecutado > catálogo infinito.")
    pdf.bullet("Estandarización: el cliente repite si el producto es idéntico la 2.ª vez.")
    pdf.bullet("Señal de calidad honest a: ingredientes reconocibles (huevo, patata, AOVE).")
    pdf.bullet("Logística: sin control de frío y merma, el margen se evapora.")
    pdf.bullet("Lo que NO copiar: estética de lineal de supermercado; TortiClub es premium emocional.")
    pdf.h3("Benchmark de coste casero vs TortiClub")
    pdf.table(
        ["Concepto", "Casero / super", "TortiClub"],
        [
            ["Coste MP percibido", "3–6 €", "incluido en PVP"],
            ["Tiempo del cliente", "45–70 min", "0 min cocina"],
            ["Vajilla y limpieza", "sí", "no"],
            ["Experiencia de marca", "no", "caja + ritual"],
            ["Para compartir diseñado", "improvisado", "SOLO/DUO/CLUB"],
        ],
        [55, 60, 71],
    )
    pdf.h2("22.4 Zonas prioritarias de demanda")
    pdf.bullet("Sant Andreu / Navas / La Sagrera: base de identidad y logística corta.")
    pdf.bullet("Poblenou / 22@: oficinas y cenas de piso (fase 2 de radio).")
    pdf.bullet("Gràcia / Eixample derecho: alto valor de ticket si se llega con calidad de marca.")
    pdf.bullet("Evitar al inicio repartir a toda el AMB: diluye tiempos y frialdad del producto.")
    pdf.h2("22.5 Oportunidades de crecimiento")
    pdf.bullet("Mediodía de oficinas con menú SOLO clásica + bebida (solo si no rompe cocina de noche).")
    pdf.bullet("Pedidos programados de viernes para grupos (pre-pago o señal).")
    pdf.bullet("Edición de temporada (calçots season vibe, verano suave) — máx. 1 extra a la vez.")
    pdf.bullet("Colaboración con vermuterías para CLUB en mesa (marca presente, cocina central).")

    # ——— 23 MARKETING EXT ———
    pdf.add_page()
    pdf.h1("23. Marketing, redes y lanzamiento detallado")
    pdf.h2("23.1 Calendario de contenidos (4 semanas tipo)")
    pdf.table(
        ["Día", "Pieza", "Objetivo"],
        [
            ["Lunes", "Reel corte jugoso 8 s", "Deseo de producto"],
            ["Martes", "Story bastidores 15 s", "Humanizar sin ruido"],
            ["Miércoles", "Carrusel formatos SOLO/DUO/CLUB", "Educar compra"],
            ["Jueves", "Post sabor de la semana", "Rotación sin caos"],
            ["Viernes", "CTA «abre pedidos» + link", "Conversión"],
            ["Sábado", "UGC / repost cliente", "Prueba social"],
            ["Domingo", "Mantra + ojos / descanso creativo", "Marca"],
        ],
        [30, 80, 76],
    )
    pdf.h2("23.2 Embudo de adquisición")
    pdf.bullet("TOFU: Reels y creativos de unboxing en Meta/IG + SEO local.")
    pdf.bullet("MOFU: visitas a web, guardados, consultas WhatsApp.")
    pdf.bullet("BOFU: primer pedido hold-to-confirm + experiencia 10/10.")
    pdf.bullet("Retención: recordatorio sutil a los 14–21 días (solo con base legal de contacto).")
    pdf.h2("23.3 Presupuesto de lanzamiento 60 días")
    pdf.table(
        ["Partida", "Mínimo €", "Recomendado €"],
        [
            ["Sesión foto/vídeo producto", "0 (móvil pro)", "800–1.500"],
            ["Ads Meta geolocalizados", "300", "900"],
            ["Producto seeding (15 cajas)", "150", "250"],
            ["Micro-creators (3–5)", "0–200", "400–800"],
            ["Diseño stories destacadas", "0 (ya hay base)", "100"],
            ["TOTAL", "≈ 450", "≈ 2.500–3.500"],
        ],
        [70, 50, 66],
    )
    pdf.h2("23.4 Integración Glovo / Uber Eats / Just Eat — playbook")
    for s in [
        "Negociar o al menos conocer % de comisión, exclusividad y costes de ads internos.",
        "Subir PVP en app 1–2 € vs web para compensar comisión, o menú más corto de alto margen.",
        "Fotografías propias (no genéricas del portal); seguir Brand Book.",
        "Tiempo de preparación realista (evitar cancelaciones y malas reviews).",
        "Respuestas a reseñas con tono de Club (breve, humano, sin discusiones). ",
        "Comparar semanalmente: margen neto web vs app; si app no aporta clientes nuevos rentables, pausar.",
        "Nunca dejar que la app sea el único canal: el activo es la comunidad y la web.",
    ]:
        pdf.bullet(s)
    pdf.h2("23.5 Partnerships locales")
    pdf.bullet("Cafeterías de especialidad: cross-promo «noche de Club».")
    pdf.bullet("Tiendas de diseño / concept stores del barrio: pop-up de caja.")
    pdf.bullet("Empresas 22@: packing de team lunch (facturación B2B).")
    pdf.bullet("Eventos de Barcelona Activa / food meetups: networking, no vender a la desesperada.")

    # ——— 24 QUALITY & HR ———
    pdf.add_page()
    pdf.h1("24. Calidad, formación y personas")
    pdf.h2("24.1 Estándar de producto (scorecard)")
    pdf.table(
        ["Criterio", "1–5", "Mínimo para salir"],
        [
            ["Color exterior", "", "4"],
            ["Jugosidad interior", "", "4"],
            ["Sazón", "", "4"],
            ["Integridad al corte", "", "3"],
            ["Presentación packaging", "", "5"],
            ["Tiempo vs promesa", "", "4"],
        ],
        [70, 40, 76],
    )
    pdf.p("Si la media ponderada < 4, no sale el pedido. Cultura: orgullo > ego de servicio.")
    pdf.h2("24.2 Formación de un nuevo cocinero (checklist 5 días)")
    pdf.bullet("Día 1: higiene, alérgenos, recorrido de cocina, lectura de fichas.")
    pdf.bullet("Día 2: solo Clásica bajo supervisión; 10 piezas de práctica.")
    pdf.bullet("Día 3: especiales y control de sal/picante.")
    pdf.bullet("Día 4: DUO/CLUB y ritmo con tickets reales simulados.")
    pdf.bullet("Día 5: servicio real con buddy; firma de conformidad de SOP.")
    pdf.h2("24.3 Cultura TortiClub")
    pdf.bullet("El cliente no es «un pedido»: es un miembro más del Club.")
    pdf.bullet("Los errores se reportan sin miedo; se esconde menos y se aprende más.")
    pdf.bullet("No se improvisa un sabor nuevo en servicio por aburrimiento.")
    pdf.bullet("El móvil del admin no se deja desatendido en horario de pedidos.")

    # ——— 25 TECH ———
    pdf.add_page()
    pdf.h1("25. Stack digital y evolución del producto web")
    pdf.p(
        "Estado actual: web Next.js en Vercel (torticlubworld.vercel.app) con "
        "configurador, hold-to-confirm, panel admin (pedidos, stock, reservas), "
        "identidad visual completa y flujo WhatsApp de confirmación humana."
    )
    pdf.h2("25.1 Prioridades técnicas 0–6 meses")
    pdf.bullet("Pagos online (Stripe/Redsys) para reducir no-shows — alto impacto.")
    pdf.bullet("Persistencia robusta (DB managed) en lugar de store efímero en serverless.")
    pdf.bullet("Notificaciones push/email de estado de pedido.")
    pdf.bullet("Panel de métricas: pedidos/día, ticket, sabores top, merma.")
    pdf.bullet("Backup y 2FA en admin.")
    pdf.h2("25.2 Integraciones futuras")
    pdf.table(
        ["Integración", "Para qué", "Prioridad"],
        [
            ["Stripe / Redsys", "Cobro anticipado", "Alta"],
            ["WhatsApp Cloud API", "Mensajes automáticos de estado", "Media"],
            ["Glovo/UE partners", "Sync de menú (si API/partner lo permite)", "Baja al inicio"],
            ["Google Business", "SEO local y reseñas", "Alta"],
            ["Klaviyo/Mailerlite", "CRM ligero con consentimiento", "Media"],
            ["Holded/Factura", "Facturación y contabilidad", "Alta con volumen"],
        ],
        [50, 80, 56],
    )

    # ——— 26 CHECKLIST FINAL ———
    pdf.add_page()
    pdf.h1("26. Checklist maestro de apertura (100 puntos)")
    pdf.h2("26.1 Legal y admin")
    for item in [
        "Forma jurídica decidida y documentada",
        "Alta Hacienda y SS",
        "Cuenta bancaria profesional",
        "Gestor contratado",
        "Licencia / comunicación actividad",
        "Registro / autorización sanitaria",
        "APPCC escrito y registros en blanco listos",
        "Seguro RC productos activo",
        "Seguro local/equipo si aplica",
        "Marca solicitada en OEPM",
        "Dominios y @RRSS asegurados",
        "Textos legales web publicados",
    ]:
        pdf.bullet(f"[ ] {item}")
    pdf.h2("26.2 Cocina y producto")
    for item in [
        "Fichas técnicas firmadas v1.0",
        "Foto de referencia QC en pared",
        "Proveedores con plan B",
        "Termómetros calibrados",
        "Packaging testeado con grasa real",
        "Etiquetas con alérgenos correctos",
        "Cadena de frío de entrega probada",
        "Soft launch ≥ 20 pedidos con feedback escrito",
    ]:
        pdf.bullet(f"[ ] {item}")
    pdf.h2("26.3 Marca y venta")
    for item in [
        "Web en producción estable",
        "Admin operativo y contraseñas seguras",
        "WhatsApp Business configurado",
        "Horarios publicados",
        "IG bio + destacadas + 9 posts mínimos de calidad",
        "Protocolo de respuesta a quejas",
        "Precios alineados web / carta física",
        "Fondo de maniobra ingresado",
    ]:
        pdf.bullet(f"[ ] {item}")

    pdf.h2("26.4 Cierre del dossier")
    pdf.p(
        "TortiClub tiene una base de marca y producto digital poco habitual en el "
        "segmento de la tortilla. El éxito no dependerá de «ser la mejor tortilla "
        "del mundo en abstracto», sino de ejecutar cada día el estándar, proteger "
        "la legalidad, cuidar el margen y mantener la coherencia de marca en cada "
        "caja que se abre."
    )
    pdf.ln(4)
    pdf.set_font("Body", "B", 12)
    pdf.set_text_color(*INK)
    pdf.cell(0, 8, "Parte. Comparte. Repite.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("Body", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 6, "Bienvenido al Club.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(8)
    if LOGO.exists():
        pdf.img_safe(LOGO, w=28)

    # Final page - disclaimer
    pdf.add_page()
    pdf.h1("Disclaimer y control de documento")
    pdf.p(
        f"Documento generado el {datetime.now().strftime('%d/%m/%Y %H:%M')}. "
        "Versión 2.0 ampliada. Propiedad de TortiClub. Prohibida la distribución pública "
        "sin autorización de los fundadores."
    )
    pdf.p(
        "Las estimaciones económicas y referencias normativas son orientativas y "
        "pueden quedar desactualizadas. Antes de invertir o firmar contratos, "
        "contrastar con profesionales colegiados en Barcelona (gestoría, abogado, "
        "técnico sanitario, corredor de seguros)."
    )
    pdf.table(
        ["Campo", "Valor"],
        [
            ["Nombre del archivo", OUT.name],
            ["Marca", "TortiClub"],
            ["Ciudad", "Barcelona (Sant Andreu)"],
            ["Web", "torticlubworld.vercel.app"],
            ["Clasificación", "Confidencial"],
            ["Versión", "2.0"],
        ],
        [60, 126],
    )

    pdf.output(str(OUT))
    print(f"OK -> {OUT}")
    print(f"Pages: {pdf.page_no()}")


if __name__ == "__main__":
    build()
