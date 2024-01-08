document.addEventListener("DOMContentLoaded", function () {
    const btnFilter = document.querySelector('.icon-filter');
    const containerFilter = document.querySelector('.container-filters');
    const closeBtn = document.querySelector('.close-btn');
    const searchForm = document.querySelector('form');

    btnFilter.addEventListener('click', () => {
        containerFilter.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    closeBtn.addEventListener('click', () => {
        containerFilter.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário padrão
        const searchTerm = document.querySelector('input[type="search"]').value.toLowerCase();

        // Aqui você pode adicionar lógica para filtrar os cards de acordo com a busca
        filterPokemon(searchTerm);
    });

    // Adiciona event listener para cada checkbox de tipo
    const typeCheckboxes = document.querySelectorAll('.group-type input');
    typeCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            // Quando uma checkbox é alterada, chama a função de filtragem
            filterByType();
        });
    });
});

function filterByType() {
    const selectedTypes = getSelectedTypes(); // Obtém os tipos selecionados
    const cards = document.querySelectorAll('.card-pokemon');

    cards.forEach(function (card) {
        const types = getCardTypes(card);

        // Verifica se algum tipo selecionado corresponde aos tipos do Pokémon
        const showCard = selectedTypes.length === 0 || selectedTypes.some(type => types.includes(type));

        // Exibe ou oculta o card com base na seleção de tipos
        card.style.display = showCard ? 'block' : 'none';
    });
}

function getSelectedTypes() {
    // Obtém os tipos selecionados
    const selectedTypes = [];
    const typeCheckboxes = document.querySelectorAll('.group-type input:checked');
    
    typeCheckboxes.forEach(function (checkbox) {
        selectedTypes.push(checkbox.name);
    });

    return selectedTypes;
}

function getCardTypes(card) {
    // Obtém os tipos do Pokémon a partir do card
    const typeElements = card.querySelectorAll('.card-types span');
    const types = [];

    typeElements.forEach(function (typeElement) {
        types.push(typeElement.textContent.toLowerCase());
    });

    return types;
}

function filterPokemon(searchTerm) {
    const cards = document.querySelectorAll('.card-pokemon');

    cards.forEach(function (card) {
        const pokemonName = card.querySelector('h3').textContent.toLowerCase();
        const types = getCardTypes(card);

        // Verifica se a barra de pesquisa está vazia ou se o nome ou tipos do Pokémon incluem o searchTerm
        const showCard = searchTerm === '' || pokemonName.includes(searchTerm) || types.includes(searchTerm);

        // Exibe ou oculta o card com base na barra de pesquisa
        card.style.display = showCard ? 'block' : 'none';
    });
}


