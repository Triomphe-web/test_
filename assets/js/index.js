document.addEventListener("DOMContentLoaded", function () {
  const url = "assets/article.json";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    })
    .then((data) => {
      const blocs = data.map((bloc) => ({
        ref: bloc.ref,
        famille: bloc.familleBloc.replace(/^\d+-/, ""),
        themes: bloc.themes,
        nomBloc: bloc.nom_du_bloc,
        libelleBloc: bloc.libelle,
        photo: bloc.photo,
        image_size: bloc.image_size,
      }));

      /**
       * Fonction pour trier alphabetiquement les bloc dans le json
       * @param mixed blocs
       * 
       * @return [type]
       */
      function trierBlocs(blocs) {
        return blocs.sort((a, b) => {
          if (a.famille === b.famille) {
            return a.libelleBloc.localeCompare(b.libelleBloc);
          } else {
            return a.famille.localeCompare(b.famille);
          }
        });
      }

      /**
       * Fonction pour afficher le bloc
       * @param mixed blocs
       * 
       * @return [type]
       */
      function afficherBlocs(blocs) {
        const listeBlocs = document.getElementById("liste-blocs");

        listeBlocs.innerHTML = "";

        // Parcourir les blocs triés
        blocs.forEach((bloc) => {
          const blocDiv = document.createElement("div");
          blocDiv.classList.add("card", "mb-3");

          // Créer un conteneur de rangée Bootstrap
          const rowDiv = document.createElement("div");
          rowDiv.classList.add("row", "no-gutters");

          // image
          const imageCol = document.createElement("div");
          imageCol.classList.add("col-md-4", "col-4");
          imageCol.style.maxWidth = "33.333333%";

          // Créer l'image
          const img = document.createElement("img");
          img.src = bloc.photo;
          img.alt = bloc.libelleBloc;
          img.classList.add("card-img");
          imageCol.appendChild(img);

          // Colonne pour le texte
          const textCol = document.createElement("div");
          textCol.classList.add("col-md-8", "col-8");
          textCol.style.maxWidth = "66.666667%";

          // Créer le contenu textuel
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.textContent = bloc.libelleBloc;

          const cardText = document.createElement("p");
          cardText.classList.add("card-text");
          cardText.textContent = `Ref : ${bloc.ref}, Thème : ${bloc.themes}, Nom du Bloc : ${bloc.nomBloc}`;

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);

          textCol.appendChild(cardBody);

          rowDiv.appendChild(imageCol);
          rowDiv.appendChild(textCol);

          blocDiv.appendChild(rowDiv);

          listeBlocs.appendChild(blocDiv);
        });
      }

      // Trier les blocs
      const blocsTries = trierBlocs(blocs);

      // Afficher les blocs
      afficherBlocs(blocsTries);
      // Gérer la recherche lorsque le bouton est cliqué
      const searchButton = document.getElementById("searchButton");
      searchButton.addEventListener("click", function () {
        afficherBlocs(blocsTries);
      });
    });
  // Gérer la soumission du formulaire de recherche
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire d'être soumis normalement

    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      fetch(`search.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `searchTerm=${encodeURIComponent(searchTerm)}`,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
          }
          return response.json();
        })
        .then((data) => {
          afficherBlocs(data); // Afficher les résultats de la recherche
        })
        .catch((error) => {
          console.error("Une erreur est survenue :", error);
        });
    }
  });
});
