import type { StoryData } from "./types";

export function makeDemoStory(): StoryData {
  return {
    address: "123 Maple Lane, Austin, TX 78701",
    heroPhoto: {
      id: "demo-cover",
      type: "photo",
      url: "/demo/cover.png",
    },
    chapters: [
      {
        id: "ch-welcome",
        title: "Welcome Home",
        blocks: [
          {
            id: "b-welcome-photo",
            type: "media",
            span: 3,
            media: { id: "demo-welcome", type: "photo", url: "/demo/welcome-home.png" },
          },
          {
            id: "b-welcome-text",
            type: "text",
            span: 3,
            text: `We have poured our hearts into this home for the past eight years. Every corner holds a memory — the kids' laughter echoing across the backyard, fire pit gatherings with friends who became family, and early mornings watching the sunrise from the garden.\n\nThis home raised three incredible children. We taught them to ride bikes in this driveway, watched them grow up in these rooms, and made more memories than we could ever count.\n\nLife is pulling us toward a new chapter. My husband's career has brought an opportunity we cannot pass up — a return to the city where we both grew up, where our family has deep roots. Saying goodbye to this home is one of the hardest things we've done.\n\nWe hope the next family loves it as deeply as we have.`,
          },
        ],
      },
      {
        id: "ch-favorite",
        title: "Our Favorite Story",
        blocks: [
          {
            id: "b-favorite-photo",
            type: "media",
            span: 3,
            media: { id: "demo-favorite", type: "photo", url: "/demo/our-favorite-story.png" },
          },
          {
            id: "b-favorite-text",
            type: "text",
            span: 3,
            text: `If we had to name one feature that defined us as a family, it would be the wood-burning fireplace.\n\nEvery November, as soon as the temperatures dropped, we lit the first fire of the season. The holidays here were magical — the kids waking up early on Christmas morning, the fire already crackling, the smell of oak filling the living room. We gathered around that hearth for every celebration, every hard conversation, and every quiet evening in between.\n\nWe are leaving behind several cords of seasoned oak firewood, already split and ready to burn. Consider it our first gift to you.`,
          },
        ],
      },
      {
        id: "ch-built",
        title: "Built to Last",
        blocks: [
          {
            id: "b-built-porch",
            type: "media",
            span: 2,
            media: { id: "demo-porch", type: "photo", url: "/demo/built-to-last-porch.png" },
          },
          {
            id: "b-built-bath-before",
            type: "media",
            span: 1,
            media: { id: "demo-bath-before", type: "photo", url: "/demo/built-to-last-bath-before.png" },
          },
          {
            id: "b-built-bath-after",
            type: "media",
            span: 1,
            media: { id: "demo-bath-after", type: "photo", url: "/demo/built-to-last-bath-after.png" },
          },
          {
            id: "b-built-text",
            type: "text",
            span: 2,
            text: `10 projects. $80,000 invested. Five years of intentional improvements.\n\nWe didn't flip this home — we lived in it, and every upgrade was made because we planned to stay forever.\n\nThe Screened Porch Addition — We added the screened porch three summers ago and it became the most-used room in the house. String lights at dusk, dinners that stretched into the evening, and a ceiling fan that kept the space comfortable even in the peak of August.\n\nComplete Bathroom Remodel — What was once a dated pink-tiled bathroom became a spa-like retreat with custom tile, a soaking tub, and elevated fixtures. The before and after photos speak for themselves.`,
          },
        ],
      },
      {
        id: "ch-neighborhood",
        title: "Neighborhood Stories",
        blocks: [
          {
            id: "b-neighborhood-photo",
            type: "media",
            span: 3,
            media: { id: "demo-neighborhood", type: "photo", url: "/demo/neighborhood.png" },
          },
          {
            id: "b-neighborhood-text",
            type: "text",
            span: 3,
            text: `Saturday mornings were sacred in this house.\n\nAfter a slow breakfast, we would make our way on foot or by bike to one of the several independent coffee shops within easy reach. The walkability of this neighborhood was something we discovered in week one and never stopped appreciating.\n\nSummer mornings especially — the kids riding bikes, grabbing pastries, taking the long way home through the park. It became a weekly ritual, and the community around those coffee shops became people we knew by name.`,
          },
        ],
      },
    ],
  };
}
