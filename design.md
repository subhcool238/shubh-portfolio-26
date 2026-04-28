---
name: Spatial Portfolio Design System
colors:
  surface: '#10131b'
  surface-dim: '#10131b'
  surface-bright: '#363942'
  surface-container-lowest: '#0b0e16'
  surface-container-low: '#181c23'
  surface-container: '#1c2028'
  surface-container-high: '#272a32'
  surface-container-highest: '#31353d'
  on-surface: '#e0e2ed'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e0e2ed'
  inverse-on-surface: '#2d3039'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#ffabf3'
  on-secondary: '#5b005b'
  secondary-container: '#fe00fe'
  on-secondary-container: '#500050'
  tertiary: '#ffb595'
  on-tertiary: '#571e00'
  tertiary-container: '#ef6719'
  on-tertiary-container: '#4c1a00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810081'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb595'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#10131b'
  on-background: '#e0e2ed'
  surface-variant: '#31353d'
typography:
  display-xl:
    fontFamily: Metropolis
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Metropolis
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Metropolis
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Metropolis
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Metropolis
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Metropolis
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Metropolis
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

This design system is engineered for a spatial UX designer, emphasizing depth, precision, and the intersection of physical and digital environments. The brand personality is **sleek, futuristic, and professional**, evoking the feeling of a high-end specialized studio.

The visual direction utilizes **Glassmorphism** and **Minimalism** to create a sense of layering and immersion. By leveraging background blurs and vibrant light-emitting accents, the UI mimics the optics of augmented and virtual reality interfaces. The goal is to provide a premium, editorial experience that feels both technically sophisticated and effortlessly clean.

## Colors

The palette is rooted in a deep-black foundation to maximize the perceived contrast of spatial elements. 

- **Primary & Secondary:** Vibrant Blue (#007AFF) and Magenta (#FF00FF) are utilized as functional accents and atmospheric glows. 
- **Surface Colors:** Deep blacks and dark grays provide the structural background, ensuring that "glass" elements remain legible and distinct.
- **Gradients:** High-energy blue-to-magenta gradients are reserved for primary calls to action and focal points, representing the "spatial energy" of the designer’s work.
- **Transparency:** Backgrounds utilize varying levels of alpha transparency (80-90%) combined with backdrop blurs to simulate material depth.

## Typography

This design system uses **Metropolis** exclusively to maintain a geometric, modern, and highly legible aesthetic across all touchpoints. 

Headlines utilize tight tracking and heavy weights to create a commanding presence, while body text uses generous line heights to ensure readability against dark, textured backgrounds. Small labels are set in uppercase with increased letter spacing to serve as technical annotations, reinforcing the professional and futuristic character of the portfolio.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop viewports to maintain an editorial, gallery-like feel. 

A 12-column grid is used for content organization, with generous margins to allow the "spatial" elements to breathe. Spacing follows an 8px rhythmic scale. White space—or rather "dark space"—is used aggressively to separate case studies and highlight high-fidelity imagery. Layout shifts should feel fluid and intentional, utilizing wide gutters to prevent visual clutter.

## Elevation & Depth

Depth is the core differentiator of this design system. Rather than traditional shadows, hierarchy is established through **Glassmorphism** and **Tonal Layers**.

1.  **Base Layer:** Solid `#050505` background.
2.  **Mid Layer (Cards):** Semi-transparent `#1C1C1E` with a `20px` to `40px` backdrop-blur and a `1px` inner border (stroke) at 10% white opacity.
3.  **Top Layer (Floating UI):** Higher transparency with subtle blue or magenta "rim lights"—thin gradients applied to the borders to simulate light catching the edge of a glass pane.
4.  **Atmospheric Depth:** Use large, soft radial gradients in the background (Blue/Magenta at 5-10% opacity) to create a sense of 3D environment behind the content.

## Shapes

The shape language is consistently **Rounded**, reflecting the industrial design of modern VR/AR headsets. 

A standard radius of `0.5rem` (8px) is applied to small interactive elements like inputs, while larger containers and cards use `1rem` (16px) to `1.5rem` (24px) for a softer, more premium appearance. This prevents the interface from feeling "sharp" or aggressive, aligning with the "sleek" brand personality.

## Components

### Buttons
- **Primary:** Gradient fill (Blue to Magenta) with white text. Apply a subtle outer glow on hover using the primary blue color.
- **Secondary/Ghost:** 1px border with a gradient stroke. Background is transparent, becoming slightly opaque on hover.

### Cards
- **Construction:** Utilize the Glassmorphism style defined in the Elevation section.
- **Interactive:** On hover, the card's border opacity increases, and the backdrop-blur intensifies.

### Chips & Tags
- Used for project categories (e.g., "AR," "Spatial Audio"). Small, rounded-pill shapes with a dark gray fill and Metropolis Label-MD typography.

### Input Fields
- Dark gray background with a subtle inner shadow to indicate depth. The focus state features a 1px Blue-to-Magenta gradient border.

### Project Navigation
- Use large-scale "Spatial Parallax" images for project headers, where the text sits on a layer between the background image and a foreground glass overlay.

### Media Players
- Custom-skinned video controls with glass backgrounds and minimal iconography, designed to showcase immersive 3D walkthroughs without UI interference.
