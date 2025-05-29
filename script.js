/*TODO: - osetrit jestli je cislo v text area i desetine aby to i tak vypsalo (pres parseFloat jen predelat (u vysky a sirky uz to je)
 *       - osetrit aby se museli zadat vsechny informace a az potomo se mohlo vytisknout shrnuti a pracovat s promenymi
 *       - u E a F osetrit to aby kod vedel kdy se zadalo neco do textoveho pole na overeni
 *       - pokud nejdříve vyberem sezhlenenou > zvolime lic a rub pak prepneme na ty dalsi dve a vyberem typ latky zatemnovaci ve shrnuti se zobrazi obe (oparvit)
 *       - duplikuje se nazev vypocet pod nadpisem shrnuti (udelat to aby se to odstranilo kdyz se to znovu zmackne?)
 *       - zatemňovací druh rolety se zobrazí vždycky -
 * * */

/* Public proměnné */
let c1_real = 0; // průměr tyče (cm)
let e1_real = 0; //velikost zavesneho ucyhtu na okno
let f1_real = 0; //velikost zavesneho uchytu na dvere
let sirka_real = 0.0; // šířka rolety
let vyska_real = 0.0; // výška rolety
let a_real = ""; // název jednoho z druhů (Garnýž, Tunýlek, Nasazení)

document.addEventListener("DOMContentLoaded", (event) => {
  /*zacatecni, pro vsechny*/
  const checkboxes_druhrolety = document.querySelectorAll(
    ".wrapper-druhrolety .switch-main"
  );
  /*garnyz*/
  const checkboxes_mistoprogarnyz = document.querySelectorAll(
    ".wrapper-umistenigarnyze .switch-toggle"
  );
  const checkboxes_mistozatemnenigarnyz = document.querySelectorAll(
    ".wrapper-mistozatemneni-garnyz .switch-toggle"
  );
  const checkboxes_stupenzastineni = document.querySelectorAll(
    ".wrapper-stupenzastineni .switch-toggle"
  );
  const checkboxes_designgarnyze = document.querySelectorAll(
    ".wrapper-designgarnyze .switch-toggle"
  );
  const checkboxes_vyberlatky = document.querySelectorAll(
    ".wrapper-vyberlatky .switch-toggle"
  );
  const checkboxes_typretizku = document.querySelectorAll(
    ".wrapper-typretizku .switch-toggle"
  );
  const checkboxes_typrolety = document.querySelectorAll(
    ".wrapper-typrolety .switch-toggle"
  );
  const checkboxes_vyberlatky_polopruhlednerolety = document.querySelectorAll(
    ".wrapper-vyberlatky-polopruhlednerolety .switch-toggle"
  );
  const checkboxes_vyberlatky_poloprusvitnerolety = document.querySelectorAll(
    ".wrapper-vyberlatky-poloprusvitnerolety .switch-toggle"
  );
  const checkboxes_vyberlatky_zatemnovacirolety = document.querySelectorAll(
    ".wrapper-vyberlatky-zatemnovacirolety .switch-toggle"
  );
  const checkboxes_rubovalatka_zatemnovacirolety = document.querySelectorAll(
    ".wrapper-rubovalatka-zatemnovaci .switch-toggle"
  );
  const checkboxes_licovalatka_zatemnovacirolety = document.querySelectorAll(
    ".wrapper-licovalatka-zatemnovaci .switch-toggle"
  );

  let a1 = false; // garnyž
  let a2 = false; // nasazeni
  let a3 = false; // tunylek

  let b1 = false; // Stěna
  let b2 = false; // Strop

  let d1 = false; // Okno
  let d2 = false; // Balkónové dveře
  let d3 = false; // Dveře

  let h1 = false; // Poloprůhledná
  let h2 = false; // Poloprůsvitná
  let h3 = false; // Zatemňovací

  let i1 = false; // Čalouněná
  let i2 = false; // Částečně čalouněná
  let i3 = false; // Roleta z jednoho kusu

  let k1 = false; // BO90 - zatemneni
  let k2 = false; // BO100 - zatemneni

  let l1 = false; // plast bílý
  let l2 = false; // kov lesklý

  let m1 = false; // Šitá s tunýlky
  let m2 = false; // Šitá bez výstuh
  let m3 = false; // Sežehlená

  let o1 = false; // Voal - Šedá
  let o2 = false; // Voal - Béžová

  let p1 = false; // hneda
  let p2 = false; // seda
  let p3 = false; // bezova

  let q1 = false; // BO90 - zatemnovaci roleta
  let q2 = false; // BO100 - zatemnovaci roleta

  let r1 = false; // BO90 bílo-šedá -- rubová látka
  let r2 = false; // BO90 světle šedá -- rubová látka
  let r3 = false; // BO90 šedá -- rubová látka
  let r4 = false; // BO90 černo-šedá -- rubová látka

  let s1 = false; // Polyester / vzor potisk - hnědá -- lícová látka
  let s2 = false; // Polyester / vzor potisk - šedá -- lícová látka
  let s3 = false; // Polyester / vzor potisk - béžová -- lícová látka
  /*nasazeni*/
  const checkboxes_mistozatemneni_nasazeni = document.querySelectorAll(
    ".wrapper-mistozatemneni-nasazeni .switch-toggle"
  );
  const checkboxes_velikostzavesnehouchytu_okna = document.querySelectorAll(
    ".wrapper-velikostzavesenhouchytu .switch-toggle"
  );
  const checkboxes_velikostzavesnehouchytu_dvere = document.querySelectorAll(
    ".wrapper-velikostzavesnehouchytu-dvere .switch-toggle"
  );

  let d1_nasazeni = false; // Okno
  let d2_nasazeni = false; // Balkonove dvere
  let d3_nasazeni = false; // Dvere

  let e1_overeni = false; //protože na této proměnné závisí zobrazení ostatních polí je proměnná která bude sledovat jestli je neco napsane v textovem poli
  let e2 = false; // 1,5 cm
  let e3 = false; // 2 cm
  let e4 = false; // 2,5 cm

  let f1_overeni = false; // overeni pro textove pole jako u e
  let f2 = false; // 1,7 cm
  let f3 = false; // 4,3 cm

  /*tunylek*/

  /*Prednastavene funkce  --*/
  function handleCheckboxes(checkboxes, callback) {
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          checkboxes.forEach((cb) => {
            if (cb !== checkbox && cb.checked) {
              cb.checked = false;
            }
          });
        }
        callback(checkbox);
      });
    });
  }

  const primaryCheckboxes = document.querySelectorAll(".switch-main");

  primaryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      resetAll();
    });
  });

  function resetAll() {
    // Reset all checkboxes except primary ones
    const allCheckboxes = document.querySelectorAll(".switch-toggle");
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset all text fields
    const allTextFields = document.querySelectorAll(".text-toggle");
    allTextFields.forEach((textField) => {
      textField.value = "";
    });

    // Reset fabric selection variables
    q1 = q2 = false; // Reset zatemňovací fabric selections
    r1 = r2 = r3 = r4 = false; // Reset rubová látka selections
    s1 = s2 = s3 = false; // Reset lícová látka selections
    o1 = o2 = false; // Reset poloprůhledná fabric selections
    p1 = p2 = p3 = false; // Reset poloprůsvitná fabric selections
    k1 = k2 = false; // Reset čalounění fabric selections

    // Reset fabric selection UI
    document.querySelectorAll(".fabric-option").forEach((option) => {
      option.classList.remove("selected");
    });

    document.querySelectorAll(".fabric-select-trigger").forEach((trigger) => {
      trigger.classList.remove("selected");
      trigger.querySelector(".fabric-title").textContent = "Vyberte látku";
      trigger.querySelector(".fabric-description").textContent =
        "Klikněte pro výběr látky";
      const triggerImage = trigger.querySelector(".fabric-image");
      if (triggerImage) {
        triggerImage.remove();
      }
    });
  }

  handleCheckboxes(checkboxes_druhrolety, (checkbox) => {
    a1 = a2 = a3 = false;
    switch (checkbox.id) {
      case "garnyz":
        a1 = checkbox.checked;
        break;
      case "nasazeni":
        a2 = checkbox.checked;
        break;
      case "tunylek":
        a3 = checkbox.checked;
        break;
    }

    // Show or hide related elements based on the type of roleta
    document.querySelector(".wrapper-umistenigarnyze").style.display = a1
      ? "flex"
      : "none";
    document.querySelector(".wrapper-mistozatemneni-garnyz").style.display = a1
      ? "flex"
      : "none";
    document.querySelector(".wrapper-stupenzastineni").style.display = a1
      ? "flex"
      : "none";

    document.querySelector(".wrapper-mistozatemneni-nasazeni").style.display =
      a2 || a3 ? "flex" : "none";
    document.querySelector(".wrapper-prumertycestunylkem").style.display = a3
      ? "flex"
      : "none";

    // Hide "Dveře" option when Garnýž or Tunýlek is selected
    const dvereOptionGarnyz = document
      .querySelector("#dvere-garnyz")
      .closest(".subwrapper");
    const dvereOptionNasazeni = document
      .querySelector("#dvere-nasazeni")
      .closest(".subwrapper");

    if (a1 || a3) {
      // If Garnýž or Tunýlek is selected
      dvereOptionGarnyz.style.display = "none";
      dvereOptionNasazeni.style.display = "none";
    } else if (a2) {
      // If Nasazení is selected
      dvereOptionGarnyz.style.display = "flex";
      dvereOptionNasazeni.style.display = "flex";
    }

    /*ODSTRANOVANI POD MENU*/
    // design garnyze ondstraneni
    document.querySelector(".wrapper-designgarnyze").style.display =
      a1 && (h1 || h2 || h3) ? "flex" : "none";

    //vybery po designu garnyze odstraneni
    /*calounena - castecne calounena (maji stejna menu) + roleta z jednoho kusu jen nekde*/
    document.querySelector(".wrapper-vyberlatky").style.display =
      h1 && a1 && (i1 || i2) ? "flex" : "none";
    document.querySelector(".wrapper-typretizku").style.display =
      h1 && a1 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".wrapper-typrolety").style.display =
      h1 && a1 && (i1 || i2 || i3) ? "flex" : "none";
    /*-------------------------------------*/
    document.querySelector(".sub-sezehlena").style.display =
      h1 && a1 && i1 ? "none" : "flex";
    document.querySelector(".wrapper-vyberlatky").style.display =
      h1 && a1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-typretizku").style.display =
      h1 && a1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-typrolety").style.display =
      h1 && a1 && i1 ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-polopruhlednerolety"
    ).style.display = h1 && a1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-sirkarolety").style.display =
      h1 && a1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-vyskarolety").style.display =
      h1 && a1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-vyberlatky-poloprusvitnerolety").display =
      a1 && i2 ? "flex" : "none";
    /*----------------------------------------------*/
    /*document.querySelector('.wrapper-vyberlatky-poloprusvitnerolety').style.display = (i1 || i2 || i3) ? 'flex' : 'none';*/
    document.querySelector(".wrapper-sirkarolety").style.display =
      h1 && a1 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".wrapper-vyskarolety").style.display =
      h1 && a1 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".sub-sezehlena").style.display =
      h1 && a1 && (i1 || i2 || i3) ? "none" : "flex";

    /*zatemnovaci roleta - sezehlena atd.*/
    document.querySelector(".wrapper-rubovalatka-zatemnovaci").style.display =
      a1 && m3 ? "flex" : "none";
    document.querySelector(".wrapper-licovalatka-zatemnovaci").style.display =
      a1 && m3 ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-zatemnovacirolety"
    ).style.display = a1 && m3 ? "flex" : "none";

    /*nasazeni velikost zavesneho uchytu atd.*/
    document.querySelector(".wrapper-velikostzavesenhouchytu").style.display =
      a2 && (d1_nasazeni || d2_nasazeni) ? "flex" : "none";
    document.querySelector(".wrapper-velikostuchytu-vlastni").style.display =
      a2 && e1_overeni ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-poloprusvitnerolety"
    ).style.display = a1 && h2 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-polopruhlednerolety"
    ).style.display = "none";
  });

  // Function to reset all choices that come after a specific choice
  function resetSubsequentChoices(changedChoiceId) {
    // Define the order of choices
    const choiceOrder = [
      "druhrolety",
      "umistenigarnyze",
      "mistozatemneni-garnyz",
      "stupenzastineni",
      "designgarnyze",
      "vyberlatky",
      "typretizku",
      "typrolety",
      "vyberlatky-polopruhlednerolety",
      "vyberlatky-poloprusvitnerolety",
      "vyberlatky-zatemnovacirolety",
      "rubovalatka-zatemnovaci",
      "licovalatka-zatemnovaci",
    ];

    // Find the index of the changed choice
    const changedIndex = choiceOrder.findIndex(
      (choice) => choice === changedChoiceId
    );
    if (changedIndex === -1) return;

    // Reset all subsequent choices
    for (let i = changedIndex + 1; i < choiceOrder.length; i++) {
      const wrapperClass = `.wrapper-${choiceOrder[i]}`;
      const wrapper = document.querySelector(wrapperClass);
      if (wrapper) {
        // Uncheck all checkboxes in this wrapper
        const checkboxes = wrapper.querySelectorAll(".switch-toggle");
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        // Hide the wrapper
        wrapper.style.display = "none";
      }
    }

    // Reset fabric selection variables based on what was changed
    if (changedChoiceId === "druhrolety") {
      // Reset all fabric selections when main choice changes
      q1 = q2 = false; // Reset zatemňovací fabric selections
      r1 = r2 = r3 = r4 = false; // Reset rubová látka selections
      s1 = s2 = s3 = false; // Reset lícová látka selections
      o1 = o2 = false; // Reset poloprůhledná fabric selections
      p1 = p2 = p3 = false; // Reset poloprůsvitná fabric selections
      k1 = k2 = false; // Reset čalounění fabric selections

      // Reset all fabric selection UI
      document.querySelectorAll(".fabric-option").forEach((option) => {
        option.classList.remove("selected");
      });

      document.querySelectorAll(".fabric-select-trigger").forEach((trigger) => {
        trigger.classList.remove("selected");
        trigger.querySelector(".fabric-title").textContent = "Vyberte látku";
        trigger.querySelector(".fabric-description").textContent =
          "Klikněte pro výběr látky";
        const triggerImage = trigger.querySelector(".fabric-image");
        if (triggerImage) {
          triggerImage.remove();
        }
      });
    } else if (changedChoiceId === "stupenzastineni") {
      // Reset fabric selections when shade type changes
      q1 = q2 = false; // Reset zatemňovací fabric selections
      o1 = o2 = false; // Reset poloprůhledná fabric selections
      p1 = p2 = p3 = false; // Reset poloprůsvitná fabric selections

      // Reset relevant fabric selection UI
      document.querySelectorAll(".fabric-option").forEach((option) => {
        if (
          option.dataset.fabricId.includes("zatemnovaci") ||
          option.dataset.fabricId.includes("polopruhledna") ||
          option.dataset.fabricId.includes("poloprusvitna")
        ) {
          option.classList.remove("selected");
        }
      });

      document.querySelectorAll(".fabric-select-trigger").forEach((trigger) => {
        if (
          trigger.closest("#fabric-selection-container-zatemnovaci") ||
          trigger.closest("#fabric-selection-container-polopruhledna") ||
          trigger.closest("#fabric-selection-container-poloprusvitna")
        ) {
          trigger.classList.remove("selected");
          trigger.querySelector(".fabric-title").textContent = "Vyberte látku";
          trigger.querySelector(".fabric-description").textContent =
            "Klikněte pro výběr látky";
          const triggerImage = trigger.querySelector(".fabric-image");
          if (triggerImage) {
            triggerImage.remove();
          }
        }
      });
    }

    // Reset visibility based on the changed choice
    if (changedChoiceId === "stupenzastineni") {
      // Reset visibility for all sections that depend on stupenzastineni
      document.querySelector(".wrapper-designgarnyze").style.display = "none";
      document.querySelector(".wrapper-vyberlatky").style.display = "none";
      document.querySelector(".wrapper-typretizku").style.display = "none";
      document.querySelector(".wrapper-typrolety").style.display = "none";
      document.querySelector(
        ".wrapper-vyberlatky-polopruhlednerolety"
      ).style.display = "none";
      document.querySelector(
        ".wrapper-vyberlatky-poloprusvitnerolety"
      ).style.display = "none";
      document.querySelector(
        ".wrapper-vyberlatky-zatemnovacirolety"
      ).style.display = "none";
      document.querySelector(".wrapper-rubovalatka-zatemnovaci").style.display =
        "none";
      document.querySelector(".wrapper-licovalatka-zatemnovaci").style.display =
        "none";
      document.querySelector(".wrapper-sirkarolety").style.display = "none";
      document.querySelector(".wrapper-vyskarolety").style.display = "none";
      document.querySelector(".sub-sezehlena").style.display = "none";
      document.querySelector(".sub-castecne-calounena").style.display = "none";
      document.querySelector(".sub-roleta-z-jednoho-kusu").style.display =
        "none";

      // Show only the relevant sections based on the new selection
      if (h1) {
        // polopruhledna
        document.querySelector(".wrapper-designgarnyze").style.display = "flex";
        document.querySelector(".sub-castecne-calounena").style.display =
          "flex";
        document.querySelector(".sub-roleta-z-jednoho-kusu").style.display =
          "flex";
      } else if (h2) {
        // poloprusvitna
        document.querySelector(".wrapper-designgarnyze").style.display = "flex";
        document.querySelector(".sub-castecne-calounena").style.display =
          "flex";
        document.querySelector(".sub-roleta-z-jednoho-kusu").style.display =
          "flex";
      } else if (h3) {
        // zatemnovaci
        document.querySelector(".wrapper-designgarnyze").style.display = "flex";
        document.querySelector(".sub-castecne-calounena").style.display =
          "flex";
        document.querySelector(".sub-roleta-z-jednoho-kusu").style.display =
          "flex";
      }
    }
  }

  /*--------GARNYZ---------*/
  handleCheckboxes(checkboxes_mistoprogarnyz, (checkbox) => {
    b1 = b2 = false; // zajisteni aby byli promene false
    switch (checkbox.id) {
      case "stena":
        b1 = checkbox.checked;
        break;
      case "strop":
        b2 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_mistozatemnenigarnyz, (checkbox) => {
    d1 = d2 = d3 = false; // zajisteni aby byli promene false
    switch (checkbox.id) {
      case "okno-garnyz":
        d1 = checkbox.checked;
        break;
      case "balkonove-dvere-garnyz":
        d2 = checkbox.checked;
        break;
      case "dvere-garnyz":
        d3 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_stupenzastineni, (checkbox) => {
    h1 = h2 = h3 = false; // reset variables
    switch (checkbox.id) {
      case "polopruhledna":
        h1 = checkbox.checked;
        break;
      case "poloprusvitna":
        h2 = checkbox.checked;
        break;
      case "zatemnovaci":
        h3 = checkbox.checked;
        break;
    }

    // Reset subsequent choices when this choice changes
    if (checkbox.checked) {
      resetSubsequentChoices("stupenzastineni");
    }

    // Only show .wrapper-designgarnyze if a1 is true and any of h1, h2, or h3 are true
    document.querySelector(".wrapper-designgarnyze").style.display =
      a1 && (h1 || h2 || h3) ? "flex" : "none";
    document.querySelector(".sub-castecne-calounena").style.display =
      a1 && h1 ? "none" : "flex";
    document.querySelector(".sub-roleta-z-jednoho-kusu").style.display =
      a1 && h1 ? "none" : "flex";
    /*polopruhledna*/

    /*poloprusvitna*/
    //
    /*zatemnovaci*/

    //vybery po designu garnyze odstraneni
    /*calounena - castecne calounena (maji stejna menu) + roleta z jednoho kusu jen nekde*/
    document.querySelector(".wrapper-vyberlatky").style.display =
      h1 && (i1 || i2) ? "flex" : "none";
    document.querySelector(".wrapper-typretizku").style.display =
      h1 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".wrapper-typrolety").style.display =
      h1 && (i1 || i2 || i3) ? "flex" : "none";
    /*-------------------------------------*/
    document.querySelector(".sub-sezehlena").style.display =
      h1 && i1 ? "none" : "flex";
    document.querySelector(".wrapper-vyberlatky").style.display =
      h1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-typretizku").style.display =
      h1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-typrolety").style.display =
      h1 && i1 ? "flex" : "none";
    //document.querySelector('.wrapper-vyberlatky-polopruhlednerolety').style.display = h1 ? 'flex' : 'none';
    document.querySelector(".wrapper-sirkarolety").style.display =
      h1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-vyskarolety").style.display =
      h1 && i1 ? "flex" : "none";
    document.querySelector(".wrapper-vyberlatky-poloprusvitnerolety").display =
      h1 && i2 ? "flex" : "none";
    /*----------------------------------------------*/
    /*a2 || (h1 && (i1 || i2 || i3)) == bud pokud bude zvolene nasazeni (nikdy nezmizi) a nebo pokud bude zvolena jakekoliv i a pritom bude zvolena h1*/
    document.querySelector(".wrapper-sirkarolety").style.display =
      a3 || a2 || (h1 && (i1 || i2 || i3)) ? "flex" : "none";
    document.querySelector(".wrapper-vyskarolety").style.display =
      a3 || a2 || (h1 && (i1 || i2 || i3)) ? "flex" : "none";
    document.querySelector(".sub-sezehlena").style.display =
      h1 && (i1 || i2 || i3) ? "none" : "flex";

    document.querySelector(".wrapper-rubovalatka-zatemnovaci").style.display =
      h3 && m3 ? "flex" : "none";
    document.querySelector(".wrapper-licovalatka-zatemnovaci").style.display =
      h3 && m3 ? "flex" : "none";

    /*a2*/
    document.querySelector(
      ".wrapper-vyberlatky-polopruhlednerolety"
    ).style.display = (a3 || a2) && h1 ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-poloprusvitnerolety"
    ).style.display = (a3 || a2) && h2 ? "flex" : "none";
    document.querySelector(".wrapper-typrolety").style.display =
      (a3 || a2) && (h1 || h2 || h3) ? "flex" : "none";
    document.querySelector(".sub-sezehlena").style.display =
      (a3 || a2) && (h1 || h2) ? "none" : "flex";
  });

  handleCheckboxes(checkboxes_designgarnyze, (checkbox) => {
    i1 = i2 = i3 = false;
    switch (checkbox.id) {
      case "calounena":
        i1 = checkbox.checked;
        break;
      case "castecne-calounena":
        i2 = checkbox.checked;
        break;
      case "roleta-z-jednoho-kusu":
        i3 = checkbox.checked;
        break;
    }

    // Reset subsequent choices when this choice changes
    if (checkbox.checked) {
      resetSubsequentChoices("designgarnyze");
    }

    /*calounena - castecne calounena (maji stejna menu) + roleta z jednoho kusu jen nekde*/
    document.querySelector(".wrapper-vyberlatky").style.display =
      i1 || i2 ? "flex" : "none";
    document.querySelector(".wrapper-typretizku").style.display =
      i1 || i2 || i3 ? "flex" : "none";
    document.querySelector(".wrapper-typrolety").style.display =
      i1 || i2 || i3 ? "flex" : "none";
    /*-------------------------------------*/
    document.querySelector(".sub-sezehlena").style.display = i1
      ? "none"
      : "flex";
    document.querySelector(
      ".wrapper-vyberlatky-polopruhlednerolety"
    ).style.display = h1 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".wrapper-sirkarolety").style.display = i1
      ? "flex"
      : "none";
    document.querySelector(".wrapper-vyskarolety").style.display = i1
      ? "flex"
      : "none";
    /*----------------------------------------------*/
    /*Pokud bude zvolená poloprůsvitná a klikne se na čalouněná tak místi poloprůhledné rolety chceme poloprůsvitnou*/
    document.querySelector(
      ".wrapper-vyberlatky-poloprusvitnerolety"
    ).style.display = h2 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-polopruhlednerolety"
    ).style.display = "none";
    document.querySelector(
      ".wrapper-vyberlatky-zatemnovacirolety"
    ).style.display = h3 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".wrapper-sirkarolety").style.display =
      i1 || i2 || i3 ? "flex" : "none";
    document.querySelector(".wrapper-vyskarolety").style.display =
      i1 || i2 || i3 ? "flex" : "none";
    document.querySelector(".sub-sezehlena").style.display =
      h3 && (i1 || i2 || i3) ? "flex" : "none";

    /*typ rolety - licova a rubova latka*/
    document.querySelector(".wrapper-rubovalatka-zatemnovaci").style.display =
      m3 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(".wrapper-licovalatka-zatemnovaci").style.display =
      m3 && (i1 || i2 || i3) ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-polopruhlednerolety"
    ).style.display = a1 && h1 && i1 ? "flex" : "none";
  });

  handleCheckboxes(checkboxes_vyberlatky, (checkbox) => {
    k1 = k2 = false;
    switch (checkbox.id) {
      case "bo90-calouneni":
        k1 = checkbox.checked;
        break;

      case "bo100-calouneni":
        k2 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_typretizku, (checkbox) => {
    l1 = l2 = false;
    switch (checkbox.id) {
      case "plastbily":
        l1 = checkbox.checked;
        break;

      case "kovleskly":
        l2 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_typrolety, (checkbox) => {
    m1 = m2 = m3 = false;
    switch (checkbox.id) {
      case "sitastunylky":
        m1 = checkbox.checked;
        break;

      case "sitabezvystuh":
        m2 = checkbox.checked;
        break;

      case "sezehlena":
        m3 = checkbox.checked;
        break;
    }

    /*sezehlena (pokud je zvolena garnyz > zatemnovaci > roleta z jednoho kusu >> sezehlena)*/
    document.querySelector(".wrapper-rubovalatka-zatemnovaci").style.display =
      m3 ? "flex" : "none";
    document.querySelector(".wrapper-licovalatka-zatemnovaci").style.display =
      m3 ? "flex" : "none";
    document.querySelector(
      ".wrapper-vyberlatky-zatemnovacirolety"
    ).style.display = h3 && m3 ? "flex" : "none";

    document.querySelector(
      ".wrapper-vyberlatky-zatemnovacirolety"
    ).style.display = h3 && (a3 || a2 || a1) && (m1 || m2) ? "flex" : "none";
  });

  handleCheckboxes(checkboxes_vyberlatky_polopruhlednerolety, (checkbox) => {
    o1 = o2 = false;
    switch (checkbox.id) {
      case "voalseda":
        o1 = checkbox.checked;
        break;

      case "voalbezova":
        o2 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_vyberlatky_poloprusvitnerolety, (checkbox) => {
    p1 = p2 = p3 = false;
    switch (checkbox.id) {
      case "hneda":
        p1 = checkbox.checked;
        break;

      case "seda":
        p2 = checkbox.checked;
        break;

      case "bezova":
        p3 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_vyberlatky_zatemnovacirolety, (checkbox) => {
    q1 = q2 = false;
    switch (checkbox.id) {
      case "bo90-zatemnovaci":
        q1 = checkbox.checked;
        break;

      case "bo100-zatemnovaci":
        q2 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_rubovalatka_zatemnovacirolety, (checkbox) => {
    r1 = r2 = r3 = r4 = false;
    switch (checkbox.id) {
      case "rubova-biloseda-bo90":
        r1 = checkbox.checked;
        break;

      case "rubova-svetleseda-bo90":
        r2 = checkbox.checked;
        break;

      case "rubova-seda-bo90":
        r3 = checkbox.checked;
        break;

      case "rubova-cernoseda-bo90":
        r4 = checkbox.checked;
        break;
    }
  });

  handleCheckboxes(checkboxes_licovalatka_zatemnovacirolety, (checkbox) => {
    s1 = s2 = s3 = false;
    switch (checkbox.id) {
      case "hneda-lic":
        s1 = checkbox.checked;
        break;

      case "seda-lic":
        s2 = checkbox.checked;
        break;

      case "bezova-lic":
        s3 = checkbox.checked;
        break;
    }
  });

  /*Nasazení*/

  handleCheckboxes(checkboxes_mistozatemneni_nasazeni, (checkbox) => {
    d1_nasazeni = d2_nasazeni = d3_nasazeni = false;
    switch (checkbox.id) {
      case "okno-nasazeni":
        d1_nasazeni = checkbox.checked;
        break;

      case "balkonove-dvere-nasazeni":
        d2_nasazeni = checkbox.checked;
        break;

      case "dvere-nasazeni":
        d3_nasazeni = checkbox.checked;
        break;
    }

    document.querySelector(".wrapper-stupenzastineni").style.display =
      d1_nasazeni || d2_nasazeni || d3_nasazeni ? "flex" : "none";
    /*document.querySelector('.wrapper-typrolety').style.display = (d1_nasazeni || d2_nasazeni || d3_nasazeni) ? 'flex' : 'none';*/
    let tady = null; //tady by nejak melo byt vytvoreno to aby fungovalo typ rolety a ty veci pod tim bez toho aniz by se to rozbilo
    document.querySelector(".wrapper-sirkarolety").style.display =
      d1_nasazeni || d2_nasazeni || d3_nasazeni ? "flex" : "none";
    document.querySelector(".wrapper-vyskarolety").style.display =
      d1_nasazeni || d2_nasazeni || d3_nasazeni ? "flex" : "none";

    document.querySelector(".wrapper-velikostzavesenhouchytu").style.display =
      a2 && (d1_nasazeni || d2_nasazeni) ? "flex" : "none";
    document.querySelector(".wrapper-velikostuchytu-vlastni").style.display =
      (d1_nasazeni || d2_nasazeni) && e1_overeni ? "flex" : "none";

    document.querySelector(
      ".wrapper-velikostzavesnehouchytu-dvere"
    ).style.display = a2 && d3_nasazeni ? "flex" : "none";
  });

  handleCheckboxes(checkboxes_velikostzavesnehouchytu_okna, (checkbox) => {
    e1_overeni = e2 = e3 = e4 = false;
    switch (checkbox.id) {
      case "vlastni-check":
        e1_overeni = checkbox.checked;
        break;

      case "1pul":
        e2 = checkbox.checked;
        break;

      case "2":
        e3 = checkbox.checked;
        break;

      case "2pul":
        e4 = checkbox.checked;
        break;
    }

    document.querySelector(".wrapper-velikostuchytu-vlastni").style.display =
      e1_overeni ? "flex" : "none";
  });

  handleCheckboxes(checkboxes_velikostzavesnehouchytu_dvere, (checkbox) => {
    f1_overeni = f2 = f3 = false;
    switch (checkbox.id) {
      case "vlastni-check-dvere":
        f1_overeni = checkbox.checked;
        break;

      case "1celasedm":
        f2 = checkbox.checked;
        break;

      case "4celatri":
        f3 = checkbox.checked;
        break;
    }

    document.querySelector(".wrapper-velikostuchytu-vlastni").style.display =
      f1_overeni ? "flex" : "none";
  });

  /* Button event listener */
  const button_submit = document.querySelector(".button-submit");
  const sirkaInput = document.getElementById("sirkarolety");
  const vyskaInput = document.getElementById("vyskarolety");

  button_submit.addEventListener("click", (event) => {
    const sirka_wrap = document.getElementById("sirkarolety").value.trim();
    const vyska_wrap = document.getElementById("vyskarolety").value.trim();

    if (!sirka_wrap || !vyska_wrap) {
      alert("Všechny informace a rozměry nejsou zadané!");
      return;
    }

    /*Obecne pro vsechny (vyska, sirka)*/
    if (!isNaN(sirka_wrap)) {
      const sirka = parseFloat(sirka_wrap);
      if (sirka >= 25 && sirka <= 290) {
        //v centimetrech
        sirka_real = sirka;
        console.log(sirka);
      } else {
        alert("zadané parametry nesplňují kritéria: sirka rolety " + sirka);
      }
    }

    if (!isNaN(vyska_wrap)) {
      const vyska = parseFloat(vyska_wrap);
      if (vyska >= 60 && vyska < 300) {
        //v centimetrech
        vyska_real = vyska;
        console.log(vyska);
      } else {
        alert("zadané parametry nesplňují kritéria: vyska rolety " + vyska);
      }
    }
    if (a3) {
      const prumertyce = document.getElementById("prumertyce").value.trim();
      if (!isNaN(prumertyce)) {
        const c1 = parseFloat(prumertyce);
        if (c1 >= 1 && c1 <= 4) {
          c1_real = c1;
          console.log(c1); //muze se pote odstranit
        } else {
          alert("zadané parametry nesplňují kritéria: průměr tyče " + c1);
        }
      }
    }

    if (a2) {
      if (e1_overeni) {
        const velikostuchytu_okno = document
          .getElementById("vlastni")
          .value.trim();
        if (!isNaN(velikostuchytu_okno)) {
          const e1 = parseInt(velikostuchytu_okno);
          if (e1 >= 1.3 && e1 <= 5) {
            e1_real = e1;
            console.log(e1); //muze se pote odstranit
          } else {
            alert(
              "zadané parametry nesplňují kritéria: velikost úchytu na okno " +
                e1
            );
          }
        }
      }

      if (f1_overeni) {
        const velikostucyhtu_dvere = document
          .getElementById("vlastni")
          .value.trim();
        if (!isNaN(velikostucyhtu_dvere)) {
          const f1 = parseInt(velikostucyhtu_dvere);
          if (f1 >= 1.3 && f1 <= 5) {
            f1_real = f1;
            console.log(f1); //muze se pote odstranit
          } else {
            alert(
              "zadané parametry nesplňují kritéria: velikost úchytu na okno " +
                f1
            );
          }
        }
      }
    }

    const shrnuti_wrap = document.querySelector(".wrapper-shrnuti");
    shrnuti_wrap.style.display = "block";
    const children = shrnuti_wrap.children;
    for (let i = children.length - 1; i >= 0; i--) {
      if (children[i].tagName !== "H3") {
        shrnuti_wrap.removeChild(children[i]);
      }
    }

    checkboxes_druhrolety.forEach((checkboxi) => {
      if (checkboxi.checked) {
        a_real = checkboxi.id;
        const druh = document.createElement("p");
        druh.textContent = "Druh: " + a_real;
        shrnuti_wrap.append(druh);
        if (checkboxi.id == "garnyz") {
          /*B -- Místo pro garnýž*/
          const misto_garnyze = document.createElement("p");
          const textB = "Místo kde bude garnýž: ";
          if (b1) {
            misto_garnyze.textContent = textB + "Stěna";
          } else if (b2) {
            misto_garnyze.textContent = textB + "Strop";
          } else {
            alert("vypln vsechny veci");
          }

          shrnuti_wrap.append(misto_garnyze);
          /*D -- Místo zatemnění*/
          const misto_zatemneni = document.createElement("p");
          const textD = "Místo zatemnění garnyže: ";
          if (d1) {
            misto_zatemneni.textContent = textD + "Okno";
          } else if (d2) {
            misto_zatemneni.textContent = textD + "Balkónové dveře";
          } else if (d3) {
            misto_zatemneni.textContent = textD + "Dveře";
          }
          shrnuti_wrap.append(misto_zatemneni);
          /*H -- Stupeň zastínění*/
          const stupen_zastineni = document.createElement("p");
          const textH = "Stupeň zastínění rolety: ";
          if (h1) {
            stupen_zastineni.textContent = textH + "Poloprůhledná";
          } else if (h2) {
            stupen_zastineni.textContent = textH + "Poloprůsvitná";
          } else if (h3) {
            stupen_zastineni.textContent = textH + "Zatemňovácí";
          }
          shrnuti_wrap.append(stupen_zastineni);
          /*I -- Design Garnýže*/
          const design_garnyze = document.createElement("p");
          const textI = "Design garnýže: ";
          if (i1) {
            design_garnyze.textContent = textI + "Čalouněná";
          } else if (i2) {
            design_garnyze.textContent = textI + "Částečně Čalouněná";
          } else if (i3) {
            design_garnyze.textContent = textI + "Roleta z jednoho kusu";
          }
          shrnuti_wrap.append(design_garnyze);
          /*K -- Výběr látky*/
          const vyber_latky = document.createElement("p");
          const textK = "Vybraná látka: ";
          if (k1) {
            vyber_latky.textContent = textK + "BlackOut 90";
          } else if (k2) {
            vyber_latky.textContent = textK + "BlackOut 100";
          }
          shrnuti_wrap.append(vyber_latky);
          /*L -- Typ řetízku*/
          const typ_retizku = document.createElement("p");
          const textL = "Vybraný typ řetízku: ";
          if (l1) {
            typ_retizku.textContent = textL + "Plast Bílý";
          } else if (l2) {
            typ_retizku.textContent = textL + "Kov lesklý";
          }
          shrnuti_wrap.append(typ_retizku);
          /*M -- Typ rolety*/
          const typ_rolety = document.createElement("p");
          const textM = "Vybraný typ rolety: ";
          if (m1) {
            typ_rolety.textContent = textM + "Šítá s tunýlky";
          } else if (m2) {
            typ_rolety.textContent = textM + "Šitá bez výstuh";
          } else if (m3) {
            typ_rolety.textContent = textM + "Sežehléná";
          }
          shrnuti_wrap.append(typ_rolety);
          /*O -- Vyber latky polopruhledne rolety*/
          const latka_polopruhledna = document.createElement("p");
          const textO = "Látka rolety (poloprůhledné): ";
          if (o1) {
            latka_polopruhledna.textContent = textO + "Voal Šedá";
          } else if (o2) {
            latka_polopruhledna.textContent = textO + "Voal Béžová";
          }
          shrnuti_wrap.append(latka_polopruhledna);
          /*P -- Vyber latky poloprusvitne rolety*/
          const latka_poloprusvitna = document.createElement("p");
          const textP = "Látka rolety (poloprůsvitná): ";
          if (p1) {
            latka_poloprusvitna.textContent = textP + "Hnědá";
          } else if (p2) {
            latka_poloprusvitna.textContent = textP + "Šedá";
          } else if (p3) {
            latka_poloprusvitna.textContent = textP + "Béžová";
          }
          shrnuti_wrap.append(latka_poloprusvitna);
          /*Q -- Vyber latky zatemnovaci rolety*/
          const latka_zatemnovaci = document.createElement("p");
          const textQ = "Látka rolety (zatemňovací): ";
          if (h3 && (q1 || q2)) {
            if (q1) {
              latka_zatemnovaci.textContent =
                textQ + "BO90 - Standardní zatemňovací látka";
            } else if (q2) {
              latka_zatemnovaci.textContent =
                textQ + "BO100 - Prémiová zatemňovací látka";
            }
            shrnuti_wrap.append(latka_zatemnovaci);
          }
          /*R -- Rubová látka zatemňovací rolety*/
          const rubova_latka = document.createElement("p");
          const textR = "Rubová látka rolety: ";
          if (r1) {
            rubova_latka.textContent = textR + "Bílo-šedá BlackOut90";
          } else if (r2) {
            rubova_latka.textContent = textR + "Světle šedá BlackOut90";
          } else if (r3) {
            rubova_latka.textContent = textR + "Šedá BlackOut90";
          } else if (r4) {
            rubova_latka.textContent = textR + "Černo-šedá BlackOut90";
          }
          shrnuti_wrap.append(rubova_latka);
          /*S -- Lícová látka zatemňovací rolety*/
          const licova_latka = document.createElement("p");
          const textS = "Lícová látka rolety: ";
          if (s1) {
            licova_latka.textContent = textS + "Hnědá";
          } else if (s2) {
            licova_latka.textContent = textS + "Šedá";
          } else if (s3) {
            licova_latka.textContent = textS + "Béžová";
          }
          shrnuti_wrap.append(licova_latka);

          /*Vyska sirka*/
          const sirka_p = document.createElement("p");
          sirka_p.textContent = "Šířka rolety: " + sirka_real + " cm";
          shrnuti_wrap.append(sirka_p);

          const vyska_p = document.createElement("p");
          vyska_p.textContent = "Výška rolety: " + vyska_real + " cm";
          shrnuti_wrap.append(vyska_p);

          /*Výpočet*/

          const nadpis_garnyz = document.createElement("h3");
          const vypocet_garnyz = document.createElement("p");

          nadpis_garnyz.textContent = "Výpočet";
          shrnuti_wrap.append(nadpis_garnyz);

          vypocet_garnyz.textContent = 0.25 * sirka_real * vyska_real + "Kč";
          shrnuti_wrap.append(vypocet_garnyz);

          // Add "Poslat poptávku" button
          const sendInquiryButton = document.createElement("button");
          sendInquiryButton.className = "button-submit";
          sendInquiryButton.style.marginTop = "20px";
          sendInquiryButton.textContent = "Poslat poptávku";

          sendInquiryButton.addEventListener("click", () => {
            // Get all summary paragraphs
            const summaryItems = Array.from(shrnuti_wrap.querySelectorAll("p"));
            const emailContent = summaryItems
              .map((item) => item.textContent)
              .join("\n");

            // Create mailto link with the summary content
            const mailtoLink = `mailto:configurator@londee.cz?subject=Poptávka na roletu&body=${encodeURIComponent(
              emailContent
            )}`;
            window.location.href = mailtoLink;
          });

          shrnuti_wrap.append(sendInquiryButton);
        } else if (checkboxi.id === "nasazeni") {
          /*D -- Místo zatemnění nasazení*/
          const misto_zatemneni_nasazeni = document.createElement("p");
          const textD_nasazeni = "Místo zatemnění: ";
          if (d1_nasazeni) {
            misto_zatemneni_nasazeni.textContent = textD_nasazeni + "Okno";
          } else if (d2_nasazeni) {
            misto_zatemneni_nasazeni.textContent =
              textD_nasazeni + "Bálkonové Dveře";
          } else if (d3_nasazeni) {
            misto_zatemneni_nasazeni.textContent = textD_nasazeni + "Dveře";
          }
          shrnuti_wrap.append(misto_zatemneni_nasazeni);
          /*E -- Velikost závěsného úchytu OKNA*/
          const uchyt_okna = document.createElement("p");
          const textE = "Velikost úchytu na okno: ";
          if (e1_overeni) {
            const vlastni_velikost = document
              .getElementById("vlastni")
              .value.trim();
            if (vlastni_velikost) {
              uchyt_okna.textContent = textE + vlastni_velikost + " cm";
              shrnuti_wrap.append(uchyt_okna);
            }
          } else if (e2) {
            uchyt_okna.textContent = textE + "1,5 cm";
            shrnuti_wrap.append(uchyt_okna);
          } else if (e3) {
            uchyt_okna.textContent = textE + "2 cm";
            shrnuti_wrap.append(uchyt_okna);
          } else if (e4) {
            uchyt_okna.textContent = textE + "2,5 cm";
            shrnuti_wrap.append(uchyt_okna);
          }
          /*F -- Velikost závěsného úchytu DVEŘE*/
          const uchyt_dvere = document.createElement("p");
          const textF = "Velikost úchytu na dveře: ";
          if (f1_overeni) {
            const vlastni_velikost = document
              .getElementById("vlastni")
              .value.trim();
            if (vlastni_velikost) {
              uchyt_dvere.textContent = textF + vlastni_velikost + " cm";
              shrnuti_wrap.append(uchyt_dvere);
            }
          } else if (f2) {
            uchyt_dvere.textContent = textF + "1,7 cm";
            shrnuti_wrap.append(uchyt_dvere);
          } else if (f3) {
            uchyt_dvere.textContent = textF + "4,3 cm";
            shrnuti_wrap.append(uchyt_dvere);
          }
          /*(=vlastní zvolení při uchytu na dvere(f1_overeni))*/
          /*H -- Stupeň zastínění*/
          const stupen_zastineni = document.createElement("p");
          const textH = "Stupeň zastínění rolety: ";
          if (h1) {
            stupen_zastineni.textContent = textH + "Poloprůhledná";
          } else if (h2) {
            stupen_zastineni.textContent = textH + "Poloprůsvitná";
          } else if (h3) {
            stupen_zastineni.textContent = textH + "Zatemňovácí";
          }
          shrnuti_wrap.append(stupen_zastineni);
          /*M -- Typ rolety*/
          const typ_rolety = document.createElement("p");
          const textM = "Vybraný typ rolety: ";
          if (m1) {
            typ_rolety.textContent = textM + "Šítá s tunýlky";
          } else if (m2) {
            typ_rolety.textContent = textM + "Šitá bez výstuh";
          } else if (m3) {
            typ_rolety.textContent = textM + "Sežehléná";
          }
          shrnuti_wrap.append(typ_rolety);
          /*O -- Vyber latky polopruhledne rolety*/
          const latka_polopruhledna = document.createElement("p");
          const textO = "Látka rolety (poloprůhledné): ";
          if (o1) {
            latka_polopruhledna.textContent = textO + "Voal Šedá";
          } else if (o2) {
            latka_polopruhledna.textContent = textO + "Voal Béžová";
          }
          shrnuti_wrap.append(latka_polopruhledna);
          /*P -- Vyber latky poloprusvitne rolety*/
          const latka_poloprusvitna = document.createElement("p");
          const textP = "Látka rolety (poloprůsvitná): ";
          if (p1) {
            latka_poloprusvitna.textContent = textP + "Hnědá";
          } else if (p2) {
            latka_poloprusvitna.textContent = textP + "Šedá";
          } else if (p3) {
            latka_poloprusvitna.textContent = textP + "Béžová";
          }
          shrnuti_wrap.append(latka_poloprusvitna);
          /*Q -- Vyber latky zatemnovaci rolety*/
          const latka_zatemnovaci = document.createElement("p");
          const textQ = "Látka rolety (zatemňovací): ";
          if (h3 && (q1 || q2)) {
            if (q1) {
              latka_zatemnovaci.textContent =
                textQ + "BO90 - Standardní zatemňovací látka";
            } else if (q2) {
              latka_zatemnovaci.textContent =
                textQ + "BO100 - Prémiová zatemňovací látka";
            }
            shrnuti_wrap.append(latka_zatemnovaci);
          }
          /*R -- Rubová látka zatemňovací rolety*/
          const rubova_latka = document.createElement("p");
          const textR = "Rubová látka rolety: ";
          if (r1) {
            rubova_latka.textContent = textR + "Bílo-šedá BlackOut90";
          } else if (r2) {
            rubova_latka.textContent = textR + "Světle šedá BlackOut90";
          } else if (r3) {
            rubova_latka.textContent = textR + "Šedá BlackOut90";
          } else if (r4) {
            rubova_latka.textContent = textR + "Černo-šedá BlackOut90";
          }
          shrnuti_wrap.append(rubova_latka);
          /*S -- Lícová látka zatemňovací rolety*/
          const licova_latka = document.createElement("p");
          const textS = "Lícová látka rolety: ";
          if (s1) {
            licova_latka.textContent = textS + "Hnědá";
          } else if (s2) {
            licova_latka.textContent = textS + "Šedá";
          } else if (s3) {
            licova_latka.textContent = textS + "Béžová";
          }
          shrnuti_wrap.append(licova_latka);

          /*Vyska sirka*/
          const sirka_p = document.createElement("p");
          sirka_p.textContent = "Šířka rolety: " + sirka_real + " cm";
          shrnuti_wrap.append(sirka_p);

          const vyska_p = document.createElement("p");
          vyska_p.textContent = "Výška rolety: " + vyska_real + " cm";
          shrnuti_wrap.append(vyska_p);

          /*Výpočet*/

          const nadpis_garnyz = document.createElement("h3");
          const vypocet_garnyz = document.createElement("p");

          nadpis_garnyz.textContent = "Výpočet";
          shrnuti_wrap.append(nadpis_garnyz);

          vypocet_garnyz.textContent = 0.18 * sirka_real * vyska_real + "Kč";
          shrnuti_wrap.append(vypocet_garnyz);

          // Add "Poslat poptávku" button
          const sendInquiryButton = document.createElement("button");
          sendInquiryButton.className = "button-submit";
          sendInquiryButton.style.marginTop = "20px";
          sendInquiryButton.textContent = "Poslat poptávku";

          sendInquiryButton.addEventListener("click", () => {
            // Get all summary paragraphs
            const summaryItems = Array.from(shrnuti_wrap.querySelectorAll("p"));
            const emailContent = summaryItems
              .map((item) => item.textContent)
              .join("\n");

            // Create mailto link with the summary content
            const mailtoLink = `mailto:configurator@londee.cz?subject=Poptávka na roletu&body=${encodeURIComponent(
              emailContent
            )}`;
            window.location.href = mailtoLink;
          });

          shrnuti_wrap.append(sendInquiryButton);
        } else if (checkboxi.id === "tunylek") {
          /*Prumer tyce*/
          const prumer_tyce = document.createElement("p");
          prumer_tyce.textContent =
            "Průměr tyče pro navlečení rolety: " + c1_real;
          shrnuti_wrap.append(prumer_tyce);
          /*D -- Misto nasazeni stene jako nasazeni*/
          const misto_zatemneni_nasazeni = document.createElement("p");
          const textD_nasazeni = "Místo zatemnění: ";
          if (d1_nasazeni) {
            misto_zatemneni_nasazeni.textContent = textD_nasazeni + "Okno";
          } else if (d2_nasazeni) {
            misto_zatemneni_nasazeni.textContent =
              textD_nasazeni + "Bálkonové Dveře";
          } else if (d3_nasazeni) {
            misto_zatemneni_nasazeni.textContent = textD_nasazeni + "Dveře";
          }
          shrnuti_wrap.append(misto_zatemneni_nasazeni);
          /*H -- Stupeň zastínění*/
          const stupen_zastineni = document.createElement("p");
          const textH = "Stupeň zastínění rolety: ";
          if (h1) {
            stupen_zastineni.textContent = textH + "Poloprůhledná";
          } else if (h2) {
            stupen_zastineni.textContent = textH + "Poloprůsvitná";
          } else if (h3) {
            stupen_zastineni.textContent = textH + "Zatemňovácí";
          }
          shrnuti_wrap.append(stupen_zastineni);
          /*M -- Typ rolety*/
          const typ_rolety = document.createElement("p");
          const textM = "Vybraný typ rolety: ";
          if (m1) {
            typ_rolety.textContent = textM + "Šítá s tunýlky";
          } else if (m2) {
            typ_rolety.textContent = textM + "Šitá bez výstuh";
          } else if (m3) {
            typ_rolety.textContent = textM + "Sežehléná";
          }
          shrnuti_wrap.append(typ_rolety);
          /*O -- Vyber latky polopruhledne rolety*/
          const latka_polopruhledna = document.createElement("p");
          const textO = "Látka rolety (poloprůhledné): ";
          if (o1) {
            latka_polopruhledna.textContent = textO + "Voal Šedá";
          } else if (o2) {
            latka_polopruhledna.textContent = textO + "Voal Béžová";
          }
          shrnuti_wrap.append(latka_polopruhledna);
          /*P -- Vyber latky poloprusvitne rolety*/
          const latka_poloprusvitna = document.createElement("p");
          const textP = "Látka rolety (poloprůsvitná): ";
          if (p1) {
            latka_poloprusvitna.textContent = textP + "Hnědá";
          } else if (p2) {
            latka_poloprusvitna.textContent = textP + "Šedá";
          } else if (p3) {
            latka_poloprusvitna.textContent = textP + "Béžová";
          }
          shrnuti_wrap.append(latka_poloprusvitna);
          /*Q -- Vyber latky zatemnovaci rolety*/
          const latka_zatemnovaci = document.createElement("p");
          const textQ = "Látka rolety (zatemňovací): ";
          if (h3 && (q1 || q2)) {
            if (q1) {
              latka_zatemnovaci.textContent =
                textQ + "BO90 - Standardní zatemňovací látka";
            } else if (q2) {
              latka_zatemnovaci.textContent =
                textQ + "BO100 - Prémiová zatemňovací látka";
            }
            shrnuti_wrap.append(latka_zatemnovaci);
          }
          /*R -- Rubová látka zatemňovací rolety*/
          const rubova_latka = document.createElement("p");
          const textR = "Rubová látka rolety: ";
          if (r1) {
            rubova_latka.textContent = textR + "Bílo-šedá BlackOut90";
          } else if (r2) {
            rubova_latka.textContent = textR + "Světle šedá BlackOut90";
          } else if (r3) {
            rubova_latka.textContent = textR + "Šedá BlackOut90";
          } else if (r4) {
            rubova_latka.textContent = textR + "Černo-šedá BlackOut90";
          }
          shrnuti_wrap.append(rubova_latka);
          /*S -- Lícová látka zatemňovací rolety*/
          const licova_latka = document.createElement("p");
          const textS = "Lícová látka rolety: ";
          if (s1) {
            licova_latka.textContent = textS + "Hnědá";
          } else if (s2) {
            licova_latka.textContent = textS + "Šedá";
          } else if (s3) {
            licova_latka.textContent = textS + "Béžová";
          }
          shrnuti_wrap.append(licova_latka);

          /*Vyska sirka*/
          const sirka_p = document.createElement("p");
          sirka_p.textContent = "Šířka rolety: " + sirka_real + " cm";
          shrnuti_wrap.append(sirka_p);

          const vyska_p = document.createElement("p");
          vyska_p.textContent = "Výška rolety: " + vyska_real + " cm";
          shrnuti_wrap.append(vyska_p);

          /*Výpočet*/

          const nadpis_garnyz = document.createElement("h3");
          const vypocet_garnyz = document.createElement("p");

          nadpis_garnyz.textContent = "Výpočet";
          shrnuti_wrap.append(nadpis_garnyz);

          vypocet_garnyz.textContent = 0.14 * sirka_real * vyska_real + "Kč";
          shrnuti_wrap.append(vypocet_garnyz);

          // Add "Poslat poptávku" button
          const sendInquiryButton = document.createElement("button");
          sendInquiryButton.className = "button-submit";
          sendInquiryButton.style.marginTop = "20px";
          sendInquiryButton.textContent = "Poslat poptávku";

          sendInquiryButton.addEventListener("click", () => {
            // Get all summary paragraphs
            const summaryItems = Array.from(shrnuti_wrap.querySelectorAll("p"));
            const emailContent = summaryItems
              .map((item) => item.textContent)
              .join("\n");

            // Create mailto link with the summary content
            const mailtoLink = `mailto:configurator@londee.cz?subject=Poptávka na roletu&body=${encodeURIComponent(
              emailContent
            )}`;
            window.location.href = mailtoLink;
          });

          shrnuti_wrap.append(sendInquiryButton);
        }
      }
    });

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Use 'auto' for instant scrolling
    });
  });
  /*info karta*/
  const iconContainer = document.querySelector(".vlevo");
  const infoCard = document.querySelector(".garnyzhelp");

  if (iconContainer && infoCard) {
    // Only add event listeners if elements exist
    // For mobile devices
    iconContainer.addEventListener("click", function (event) {
      infoCard.style.display = "block";
      document.addEventListener("click", handleOutsideClick);
    });

    function handleOutsideClick(event) {
      if (!iconContainer.contains(event.target)) {
        infoCard.style.display = "none";
        document.removeEventListener("click", handleOutsideClick);
      }
    }
  }

  // Add event listener for submit button
  const submitButton = document.getElementById("submit-button");
  const summarySection = document.querySelector(".wrapper-shrnuti");

  submitButton.addEventListener("click", () => {
    summarySection.classList.add("show");
  });

  // Fabric options array
  const fabricOptions = [
    // Čalounění (K)
    {
      id: "bo90-calouneni",
      title: "BO90 - Standardní zatemňovací látka",
      description:
        "Standardní zatemňovací látka s 90% zatemněním. Vhodná pro většinu interiérů.",
      image: "content/latky_test_1.jpg",
      price: "150 Kč/m²",
      type: "calouneni",
    },
    {
      id: "bo100-calouneni",
      title: "BO100 - Prémiová zatemňovací látka",
      description:
        "Prémiová zatemňovací látka s 100% zatemněním. Ideální pro maximální zatemnění.",
      image: "content/latky_test_2.jpg",
      price: "200 Kč/m²",
      type: "calouneni",
    },
    // Rubová látka (N)
    {
      id: "rubova-biloseda-bo90",
      title: "BO90 bílo-šedá",
      description:
        "Jemná bílo-šedá rubová látka. Vhodná pro světlé interiéry a jemné barevné kombinace.",
      image: "content/latky_test_1.jpg",
      price: "150 Kč/m²",
      type: "rubova",
    },
    {
      id: "rubova-svetleseda-bo90",
      title: "BO90 světle šedá",
      description:
        "Univerzální světle šedá rubová látka. Vhodná pro většinu interiérů a barevných kombinací.",
      image: "content/latky_test_2.jpg",
      price: "150 Kč/m²",
      type: "rubova",
    },
    {
      id: "rubova-seda-bo90",
      title: "BO90 šedá",
      description:
        "Klasická šedá rubová látka. Vhodná pro moderní interiéry a neutrální barevné schémata.",
      image: "content/latky_test_1.jpg",
      price: "150 Kč/m²",
      type: "rubova",
    },
    {
      id: "rubova-cernoseda-bo90",
      title: "BO90 černo-šedá",
      description:
        "Tmavá černo-šedá rubová látka. Ideální pro kontrastní interiéry a moderní design.",
      image: "content/latky_test_2.jpg",
      price: "150 Kč/m²",
      type: "rubova",
    },
    // Lícová látka (P)
    {
      id: "hneda-lic",
      title: "Polyester / vzor potisk - hnědá",
      description:
        "Elegantní hnědá látka s potiskem. Vhodná pro teplé interiéry a přírodní barevné schémata.",
      image: "content/latky_test_1.jpg",
      price: "180 Kč/m²",
      type: "licova",
    },
    {
      id: "seda-lic",
      title: "Polyester / vzor potisk - šedá",
      description:
        "Moderní šedá látka s potiskem. Univerzální řešení pro současné interiéry.",
      image: "content/latky_test_2.jpg",
      price: "180 Kč/m²",
      type: "licova",
    },
    {
      id: "bezova-lic",
      title: "Polyester / vzor potisk - béžová",
      description:
        "Jemná béžová látka s potiskem. Vhodná pro světlé interiéry a klasické designy.",
      image: "content/latky_test_1.jpg",
      price: "180 Kč/m²",
      type: "licova",
    },
    // Poloprůhledná rolety (O)
    {
      id: "voalseda",
      title: "Voal - Šedá",
      description:
        "Jemný šedý voal. Poskytuje lehké zastínění při zachování výhledu.",
      image: "content/latky_test_2.jpg",
      price: "120 Kč/m²",
      type: "polopruhledna",
    },
    {
      id: "voalbezova",
      title: "Voal - Béžová",
      description:
        "Jemný béžový voal. Vytváří teplou atmosféru a jemné zastínění.",
      image: "content/latky_test_1.jpg",
      price: "120 Kč/m²",
      type: "polopruhledna",
    },
    // Poloprůsvitná rolety (R)
    {
      id: "hneda",
      title: "Polyester / Vzor potisk - hnědá",
      description:
        "Hnědá polyesterová látka s potiskem. Poskytuje střední stupeň zastínění.",
      image: "content/latky_test_2.jpg",
      price: "160 Kč/m²",
      type: "poloprusvitna",
    },
    {
      id: "seda",
      title: "Polyester / Vzor potisk - šedá",
      description:
        "Šedá polyesterová látka s potiskem. Univerzální řešení pro střední zastínění.",
      image: "content/latky_test_1.jpg",
      price: "160 Kč/m²",
      type: "poloprusvitna",
    },
    {
      id: "bezova",
      title: "Polyester / Vzor potisk - béžová",
      description:
        "Béžová polyesterová látka s potiskem. Vytváří příjemnou atmosféru s jemným zastíněním.",
      image: "content/latky_test_2.jpg",
      price: "160 Kč/m²",
      type: "poloprusvitna",
    },
    // Zatemňovací rolety (Q)
    {
      id: "bo90-zatemnovaci",
      title: "BO90 - Standardní zatemňovací látka",
      description:
        "Standardní zatemňovací látka s 90% zatemněním. Vhodná pro většinu interiérů.",
      image: "content/latky_test_1.jpg",
      price: "150 Kč/m²",
      type: "zatemnovaci",
    },
    {
      id: "bo100-zatemnovaci",
      title: "BO100 - Prémiová zatemňovací látka",
      description:
        "Prémiová zatemňovací látka s 100% zatemněním. Ideální pro maximální zatemnění.",
      image: "content/latky_test_2.jpg",
      price: "200 Kč/m²",
      type: "zatemnovaci",
    },
  ];

  // Function to create fabric option element
  function createFabricOption(fabric) {
    const option = document.createElement("div");
    option.className = "fabric-option";
    option.dataset.fabricId = fabric.id;

    option.innerHTML = `
        <img src="${fabric.image}" alt="${fabric.title}" class="fabric-image">
        <div class="fabric-details">
            <h3 class="fabric-title">${fabric.title}</h3>
            <p class="fabric-description">${fabric.description}</p>
            <p class="fabric-price">${fabric.price}</p>
        </div>
    `;

    option.addEventListener("click", () => {
      // Remove selected class from all options in this container
      const container = option.closest(".fabric-selection-container");
      container
        .querySelectorAll(".fabric-option")
        .forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      option.classList.add("selected");

      // Update the trigger element with selected fabric info
      const trigger = container.querySelector(".fabric-select-trigger");
      if (trigger) {
        trigger.querySelector(".fabric-title").textContent = fabric.title;
        trigger.querySelector(".fabric-description").textContent =
          fabric.description;
        // Add image preview to trigger
        let triggerImage = trigger.querySelector(".fabric-image");
        if (!triggerImage) {
          triggerImage = document.createElement("img");
          triggerImage.className = "fabric-image";
          trigger.insertBefore(
            triggerImage,
            trigger.querySelector(".fabric-details")
          );
        }
        triggerImage.src = fabric.image;
        triggerImage.alt = fabric.title;

        // Add selected class to trigger to maintain styling after selection
        trigger.classList.add("selected");
      }

      // Close the dropdown but maintain the selected styling
      trigger.classList.remove("active");
      container
        .querySelector(".fabric-options-dropdown")
        .classList.remove("show");

      // Update the corresponding variable based on fabric type
      switch (fabric.type) {
        case "calouneni":
          k1 = fabric.id === "bo90-calouneni";
          k2 = fabric.id === "bo100-calouneni";
          break;
        case "rubova":
          r1 = fabric.id === "rubova-biloseda-bo90";
          r2 = fabric.id === "rubova-svetleseda-bo90";
          r3 = fabric.id === "rubova-seda-bo90";
          r4 = fabric.id === "rubova-cernoseda-bo90";
          break;
        case "licova":
          s1 = fabric.id === "hneda-lic";
          s2 = fabric.id === "seda-lic";
          s3 = fabric.id === "bezova-lic";
          break;
        case "polopruhledna":
          o1 = fabric.id === "voalseda";
          o2 = fabric.id === "voalbezova";
          break;
        case "poloprusvitna":
          p1 = fabric.id === "hneda";
          p2 = fabric.id === "seda";
          p3 = fabric.id === "bezova";
          break;
        case "zatemnovaci":
          q1 = fabric.id === "bo90-zatemnovaci";
          q2 = fabric.id === "bo100-zatemnovaci";
          break;
      }
    });

    return option;
  }

  // Function to populate fabric selection container
  function populateFabricSelection(containerId, fabricType) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create trigger element
    const trigger = document.createElement("div");
    trigger.className = "fabric-select-trigger";
    trigger.innerHTML = `
      <div class="fabric-details">
        <div class="fabric-title">Vyberte látku</div>
        <div class="fabric-description">Klikněte pro výběr látky</div>
      </div>
      <img src="content/menu_arrow.png" alt="Dropdown" class="dropdown-arrow">
    `;

    // Create dropdown container
    const dropdown = document.createElement("div");
    dropdown.className = "fabric-options-dropdown";

    // Add fabric options to dropdown based on type
    fabricOptions
      .filter((fabric) => fabric.type === fabricType)
      .forEach((fabric) => {
        dropdown.appendChild(createFabricOption(fabric));
      });

    // Add click event to trigger
    trigger.addEventListener("click", () => {
      trigger.classList.toggle("active");
      dropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!container.contains(event.target)) {
        trigger.classList.remove("active");
        dropdown.classList.remove("show");
      }
    });

    // Add elements to container
    container.appendChild(trigger);
    container.appendChild(dropdown);
  }

  // Initialize fabric selection for each type
  populateFabricSelection("fabric-selection-container-calouneni", "calouneni");
  populateFabricSelection("fabric-selection-container-rubova", "rubova");
  populateFabricSelection("fabric-selection-container-licova", "licova");
  populateFabricSelection(
    "fabric-selection-container-polopruhledna",
    "polopruhledna"
  );
  populateFabricSelection(
    "fabric-selection-container-poloprusvitna",
    "poloprusvitna"
  );
  populateFabricSelection(
    "fabric-selection-container-zatemnovaci",
    "zatemnovaci"
  );

  // Remove duplicate function
  // Function to populate fabric options
  // function populateFabricSelection() {
  //   const container = document.getElementById("fabric-selection-container");
  //   if (!container) return;
  //   ...
  // }

  // Remove duplicate function call
  // populateFabricSelection();

  // Add input validation for custom size
  const vlastniInput = document.getElementById("vlastni");
  if (vlastniInput) {
    vlastniInput.addEventListener("input", function (e) {
      let value = parseFloat(this.value);
      if (isNaN(value)) {
        this.value = "";
        return;
      }

      // Convert to number with 1 decimal place
      value = Math.round(value * 10) / 10;

      // Enforce min/max limits
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Hide all sections initially
  document.querySelectorAll('[data-custom="wrap"]').forEach((section) => {
    section.classList.remove("show");
  });

  // Handle first choice selection
  const firstChoices = document.querySelectorAll(
    '.wrapper-druhrolety input[type="checkbox"]'
  );
  firstChoices.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // Uncheck other first choices
      firstChoices.forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });

      // Hide all sections first
      document.querySelectorAll('[data-custom="wrap"]').forEach((section) => {
        section.classList.remove("show");
      });

      // Show relevant sections based on selection
      if (this.checked) {
        if (this.id === "garnyz") {
          document
            .querySelector(".wrapper-umistenigarnyze")
            .classList.add("show");
        } else if (this.id === "nasazeni") {
          document
            .querySelector(".wrapper-mistozatemneni-nasazeni")
            .classList.add("show");
        } else if (this.id === "tunylek") {
          document
            .querySelector(".wrapper-prumertycestunylkem")
            .classList.add("show");
        }
      }
    });
  });
});

// Handle info icons and help previews
document.addEventListener("DOMContentLoaded", function () {
  // Get all info icons
  const infoIcons = document.querySelectorAll(".info-icon");

  // Add click event listener to each info icon
  infoIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Get the associated help preview
      const helpPreview = this.nextElementSibling;
      const infoPopup = this.parentElement.querySelector(".ssooss");

      // Close any other open help previews
      document.querySelectorAll(".ssooss.active").forEach((preview) => {
        if (preview !== infoPopup) {
          preview.classList.remove("active");
          preview.style.display = "none";
        }
      });

      // Toggle the current help preview
      if (infoPopup.style.display === "block") {
        infoPopup.style.display = "none";
      } else {
        infoPopup.style.display = "block";
      }
    });
  });

  // Close help preview when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".info-icon") && !e.target.closest(".ssooss")) {
      document.querySelectorAll(".ssooss").forEach((preview) => {
        preview.style.display = "none";
      });
    }
  });

  // Prevent clicks on help preview from closing it
  document.querySelectorAll(".ssooss").forEach((preview) => {
    preview.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all content overlays
  const contentOverlays = document.querySelectorAll(".content-overlay");

  // Add click event listener to each overlay
  contentOverlays.forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling up

      // Toggle active class on the overlay
      this.classList.toggle("active");
    });
  });

  // Close overlay when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".content-overlay")) {
      contentOverlays.forEach((overlay) => {
        overlay.classList.remove("active");
      });
    }
  });

  if (document.querySelector(".switch-toggle.active")) {
    document.querySelector(".ssooss").classList.add("special");
  }
});
