import path from "path";
import { CreatePagesArgs } from "gatsby";

exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const { data } = await graphql<Queries.GetProductPagesQuery>(`
    query GetProductPages {
      allProductsJson {
        nodes {
          id
          slug
        }
      }
    }
  `);

  const { data: data2 } = await graphql<Queries.GetCountryPagesQuery>(`
    query GetCountryPages {
      allCountriesJson {
        nodes {
          market
          slug
          name
        }
      }
    }
  `);

  const listTemplate = path.resolve("./src/templates/list.tsx");
  const productTemplate = path.resolve("./src/templates/pokemon.tsx");
  const countries = data2?.allCountriesJson.nodes;
  const pokemons = data?.allProductsJson.nodes;

  (countries || []).forEach((country) => {
    console.log(country);
    createPage({
      path: `${country.slug}`,
      component: listTemplate,
      context: {
        country,
      },
    });
    (pokemons || []).forEach((pokemon) => {
      if (!pokemon.slug) {
        return;
      }

      createPage({
        path: `${country.slug}/${pokemon.slug}`,
        component: productTemplate,
        context: {
          id: pokemon.id,
          market: country.market,
        },
      });
    });
  });
};
