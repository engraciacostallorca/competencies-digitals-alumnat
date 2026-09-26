/**
 * RevisaDocs - DigAgora
 * Dades dels 14 ítems d'autoavaluació basats en la
 * "GUIA PAS A PAS - Edició de textos.docx.pdf" amb les captures de pàgina extretes.
 */

const DEFAULT_ITEMS_DATA = [
  // --------------------------------------------------------------------------
  // BLOC 1: Aplicar el format del text
  // --------------------------------------------------------------------------
  {
    id: "format-corrector",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "El <span class=\"highlight-title\">corrector automàtic</span> no detecta cap falta",
    descripcio: "He utilitzat el corrector automàtic del Drive, Softcatalà o LanguageTool i he corregit les faltes que ha detectat.",
    tutorial: `
      <h4>Com utilitzar les eines de correcció ortogràfica:</h4>
      <ul>
        <li>Podeu utilitzar el <strong>corrector automàtic integrat del Drive</strong>:</li>
        <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_02.png" alt="Guia pas a pas - Corrector ortogràfic" class="guide-page-img" style="max-width: 150px;">
      </div>
        <li>També podeu copiar el text al <a href="https://www.softcatala.org/corrector/" target="_blank" rel="noopener">Corrector de Softcatalà.org</a>.</li>
        <li>O utilitzar l'extensió del navegador <strong>LanguageTool</strong>.</li>
      </ul>
      
    `
  },
  {
    id: "format-relectura",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "He revisat el text i no hi ha més <span class=\"highlight-title\">faltes</span>",
    descripcio: "He rellegit el text per assegurar-me que no hi queda cap falta d'ortografia bàsica.",
    tutorial: `
      <h4>Punts de relectura atenta:</h4>
      <ul>
        <li><strong>Comes i espais:</strong> Darrere de les comes hi va SEMPRE un espai.</li>
        <li><strong>Majúscules i punts:</strong> Les frases comencen amb MAJÚSCULA i acaben amb un PUNT FINAL.</li>
        <li><strong>Apostrofació:</strong> Quan la paraula següent comença amb vocal o h, s'apostrofa (amb alguna excepció).</li>
        <li><strong>Errors no detectats pel corrector automàtic:</strong> Altres errades de context o concordància.</li>
      </ul>
      
    `
  },
  {
    id: "format-lletra-mida",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "Tot el text té el mateix <span class=\"highlight-title\">tipus de lletra i mida</span>, excepte els títols",
    descripcio: "El tipus de lletra i la mida es mantenen uniformes en tot el cos del text (normalment mida 11 o 12).",
    tutorial: `
      <h4>Mides estàndard recomanades:</h4>
      <ul>
        <li><strong>Text normal:</strong> Mida de la lletra normalment 11 o 12 (ex: Calibri 12, Arial 11).</li>
        <li><strong>Títols:</strong> Mida més gran (14, 16 o 18) per destriar la jerarquia.</li>
      </ul>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/calibri.png" alt="Guia pas a pas - Tipografia i Mides" class="guide-page-img" style="max-width: 200px;">
      </div>
    `
  },
  {
    id: "format-titols-coherents",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "Tots els <span class=\"highlight-title\">títols</span> són iguals (subratllats, color,...). Els subtítols també",
    descripcio: "Els títols i subtítols mantenen un format uniforme al llarg del treball.",
    tutorial: `
      <h4>Regles de jerarquia de títols:</h4>
      <ul>
        <li>Tots els títols principals han de compartir la mateixa mida, font, estil i color.</li>
        <li>Tots els subtítols de segon nivell han de tenir un estil coherent.</li>
      </ul>
    
    `
  },
  {
    id: "format-justificat",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "El text està <span class=\"highlight-title\">justificat</span>",
    descripcio: "Tots els paràgrafs del treball tenen els marges esquerre i dret ben alineats i rectes.",
    tutorial: `
      <h4>Com justificar el text a l'ordinador:</h4>
      <ul>
        <li>Selecciona tot el text (Ctrl + A) i prem el botó d'<strong>Alineació Justificada</strong> (Ctrl + Shift + J).</li>
      </ul>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_04.png" alt="Exemple de text justificat (Calibri 12, interlineat 1.5)" class="guide-page-img">
      </div>
    `
  },
  {
    id: "format-interlineat",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "L'<span class=\"highlight-title\">interlineat</span> de tots els textos és el mateix",
    descripcio: "Tot el document té el mateix espaiat entre línies, normalment l'interlineat ajustat a 1.15 o 1.5.",
    tutorial: `
      <h4>Configurar l'interlineat:</h4>
      <ul>
        <li>Selecciona el text i ajusta l'espaiat entre paràgrafs i interlineat a <strong>1.15 o 1.5</strong>.</li>
      </ul>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/interlineat.png" alt="Exemples d'errors d'interlineat" class="guide-page-img">
      </div>
    `
  },
  {
    id: "format-salts-linia",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "Els <span class=\"highlight-title\">salts de línia</span> són coherents i els diferents apartats estan separats",
    descripcio: "Els apartats estan ben separats i els salts de línia permeten una lectura clara i ordenada. El text queda ben distribuït. No queda cap títol al final d'una pàgina.",
    tutorial: `
      <h4>Com estructurar els salts de pàgina:</h4>
      <ul>
        <li>Evita títols solitaris al peu de la pàgina sense el seu text corresponent a sota.</li>
        <li>Evita espais en blanc excessius sense cap contingut a l'inici o final de pàgina.</li>
      </ul>
      
    `
  },
  {
    id: "format-llistes",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "Si hi ha <span class=\"highlight-title\">llistes</span>: tenen pics o numeració",
    descripcio: "Les llistes estan ben estructurades amb pics o numeració.",
    textNoAplica: "No hi ha llistes en aquest document",
    tutorial: `
      <h4>Llistes automàtiques:</h4>
      <p>Utilitza la barra d'eines per activar les vinyetes (pics) o la numeració automàtica.</p>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_06.png" alt="Guia pas a pas - Llistes amb pics o numeració" class="guide-page-img">
      </div>
    `
  },
  {
    id: "format-equacions",
    categoria: "1. Aplicar el format del text",
    categoriaIcona: "✍️",
    titol: "Si n'hi ha, les <span class=\"highlight-title\">equacions i fórmules</span> estan escrites correctament",
    descripcio: "Les fórmules i equacions estan ben escrites i utilitzen correctament subíndexs i superíndexs (ex: H₂O, x²).",
    textNoAplica: "No hi ha equacions ni fórmules",
    tutorial: `
      <h4>Menú de Google Docs per a Subíndex i Superíndex:</h4>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_05.png" alt="Guia pas a pas - Equacions i fórmules" class="guide-page-img">
      </div>
    `
  },

  // --------------------------------------------------------------------------
  // BLOC 2: Inserir imatges, taules i altres elements de pàgina
  // --------------------------------------------------------------------------
  {
    id: "elements-imatges",
    categoria: "2. Inserir imatges, taules i altres elements de pàgina",
    categoriaIcona: "🖼️",
    titol: "Si hi ha <span class=\"highlight-title\">imatges</span>: centrades, sense deformar i amb peu de foto",
    descripcio: "Les imatges estan ben col·locades, sense deformar, dins dels marges i amb peu de foto.",
    textNoAplica: "No hi ha imatges en aquest document",
    tutorial: `
      <h4>Passos per inserir imatges correctament:</h4>
      <ol>
        <li>Desar primer la imatge a l'ordinador i després inserir-la (<strong>Insereix > Imatge</strong>).</li>
        <li>Centrada (o bé combinada amb el text).</li>
        <li>Amb peu de foto (la descripció de la imatge + la font d’on l’he extreta). Ex: <em>Ordinador portàtil. Font: Acer</em>.</li>
        <li>Sense deformar i dins dels marges del document.</li>
      </ol>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_07.png" alt="Guia pas a pas - Inserir imatges" class="guide-page-img">
        <img src="imatges_pdf/exemple_imatges.png" alt="Guia pas a pas - Inserir imatges" class="guide-page-img">
      </div>
    `
  },
  {
    id: "elements-taules",
    categoria: "2. Inserir imatges, taules i altres elements de pàgina",
    categoriaIcona: "📊",
    titol: "Si hi ha <span class=\"highlight-title\">taules</span>: centrades, títols centrats, amb vores, colors i cel·les combinades",
    descripcio: "Les taules mantenen un format uniforme, amb títols, vores, colors i cel·les combinades quan cal.",
    textNoAplica: "No hi ha taules en aquest document",
    tutorial: `
      <h4>Com dissenyar la taula:</h4>
      <ul>
        <li>Inserir taula des de <strong>Insereix > Taula</strong>.</li>
        <li>Centrar la taula i els títols de les columnes.</li>
        <li><strong>Amb el botó dret:</strong> Fes clic a les cel·les seleccionades per triar <em>"Combina les cel·les"</em>.</li>
      </ul>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_07.png" alt="Guia pas a pas - Taula Planificació" class="guide-page-img" style="display: block; margin: 10px auto;"> 
        <img src="imatges_pdf/taula.png" alt="Guia pas a pas - Taula Planificació" class="guide-page-img" style="max-width: 300px; display: block; margin: 10px auto;">
        <img src="imatges_pdf/combinaceles.png" alt="Guia pas a pas - Taula Planificació" class="guide-page-img" style="display: block; margin: 10px auto;">
      </div>
    `
  },
  {
    id: "elements-paginacio",
    categoria: "2. Inserir imatges, taules i altres elements de pàgina",
    categoriaIcona: "🔢",
    titol: "Hi ha <span class=\"highlight-title\">números de pàgina</span> (de forma automàtica)",
    descripcio: "Totes les pàgines estan numerades de manera automàtica i uniforme, normalment a la part inferior, al centre o a la dreta de la pàgina.",
    tutorial: `
      <h4>Com inserir la numeració automàtica:</h4>
      <ul>
        <li>Vés al menú <strong>Insereix > Números de pàgina</strong>.</li>
        <li>Selecciona el format desitjat a la part inferior de la pàgina.</li>
      </ul>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_07.png" alt="Guia pas a pas - Números de pàgina" class="guide-page-img">
      </div>
    `
  },
  {
    id: "elements-index",
    categoria: "2. Inserir imatges, taules i altres elements de pàgina",
    categoriaIcona: "📖",
    titol: "Hi ha un <span class=\"highlight-title\">índex automàtic</span> que recull els títols i subtítols (si n'hi ha)",
    descripcio: "Taula de continguts generada automàticament a partir dels estils de Títol 1 i Títol 2.",
    textNoAplica: "No és necessari afegir un índex automàtic",
    tutorial: `
      <h4>Passos per crear i actualitzar l'índex automàtic:</h4>
      <ol>
        <li><strong>1r Pas:</strong> Seleccionar cada títol i canviar-li l'estil, de <em>Text normal</em> a <strong>Títol 1</strong>. I tots els subtítols a <strong>Títol 2</strong>.</li>
        <li><strong>2n Pas:</strong> Menú <strong>Insereix → Taula de continguts</strong>.</li>
        <li><strong>Actualització:</strong> Si fas canvis als títols i subtítols, l’índex es pot actualitzar clicant a la icona de la fletxa circular 🔄 que apareix al costat de l’índex.</li>
      </ol>
      <div style="margin-top: 10px; text-align: center;">
        
        <img src="imatges_pdf/imatge_09.png" alt="Guia pas a pas - Estils de títol i Índex" class="guide-page-img">
         <img src="imatges_pdf/imatge_07.png" alt="Guia pas a pas - Estils de títol i Índex" class="guide-page-img">
         <img src="imatges_pdf/imatge_index.png" alt="Guia pas a pas - Estils de títol i Índex" class="guide-page-img">
      </div>
    `
  },

  // --------------------------------------------------------------------------
  // BLOC 3: Descarregar el document en format PDF
  // --------------------------------------------------------------------------
  {
    id: "descàrrega-pdf",
    categoria: "3. Descarregar el document en format PDF",
    categoriaIcona: "📥",
    titol: "El document està descarregat i entregat en <span class=\"highlight-title\">format PDF</span>",
    descripcio: "Revisió final de la distribució, els títols i el format abans d'exportar el document a PDF i entregar-lo.",
    tutorial: `
      <h4>Passos finals per exportar a PDF:</h4>
      <ul>
        <li>Revisa visualment tot el document per assegurar-te que no hi ha títols solitaris al final de pàgina ni espais buits residuals.</li>
        <li>Vés al menú <strong>Fitxer > Baixa > Document PDF (.pdf)</strong>.</li>
      </ul>
      <div style="margin-top: 10px; text-align: center;">
        <img src="imatges_pdf/imatge_11.png" alt="Guia pas a pas - Descarregar en PDF" class="guide-page-img">
      </div>
    `
  }
];
