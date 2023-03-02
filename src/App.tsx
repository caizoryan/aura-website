import "./style.css";
import { render } from "solid-js/web";
import { Component, createSignal, For, Show } from "solid-js";

const images = [
  { src: "./images/image1.jpg", t: -10, l: 20 },
  { src: "./images/image2.jpg", t: 0, l: 40 },
  { src: "./images/image3.jpg", t: 10, l: 60 },
];

let [hover, setHover] = createSignal(0);

const HoverGallery: Component = () => {
  return (
    <div class="hover-gallery">
      <For each={images}>
        {(image) => (
          <img
            src={image.src}
            style={`
              transform: rotate(${image.t * hover()}deg); 
              left: ${image.l * hover()}px; 
              opacity: ${hover()}; 
              transition: all ${image.l * 2 + 100}ms ease-in-out`}
          ></img>
        )}
      </For>
    </div>
  );
};

const [menuItems, setMenuItems] = createSignal([
  { name: "About" },
  { name: "Gallery", child: <HoverGallery></HoverGallery> },
  { name: "Contact" },
  { name: "Upcoming Events" },
]);

const Menu: Component = () => {
  return (
    <div class="menu">
      <HoverGallery></HoverGallery>
      <For each={menuItems()}>
        {(item) => (
          <div
            onMouseEnter={() => {
              if (item.name === "Gallery") setHover(1);
            }}
            onMouseLeave={() => {
              if (item.name === "Gallery") setHover(0);
            }}
            class="menu-button"
          >
            <p>{item.name}</p>
          </div>
        )}
      </For>
    </div>
  );
};

const App: Component = () => {
  return (
    <>
      <Menu></Menu>
    </>
  );
};

const root = document.getElementById("root");

render(() => <App />, root!);
