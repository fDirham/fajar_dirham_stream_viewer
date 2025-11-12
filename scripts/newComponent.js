import * as fs from "fs";
import * as path from "path";

// Get component name from command line arguments
let componentName = process.argv[2];

if (!componentName) {
  console.error("Error: Please provide a component name");
  console.log("Usage: node newComponent.js <ComponentName>");
  process.exit(1);
}

componentName = componentName[0].toUpperCase() + componentName.slice(1);

// Create the component directory
const componentDir = path.join(process.cwd(), "src", componentName);

if (fs.existsSync(componentDir)) {
  console.error(`Error: Directory '${componentName}' already exists`);
  process.exit(1);
}

fs.mkdirSync(componentDir);

// Create CSS module file (empty)
const cssContent = `.container{
}`;
fs.writeFileSync(
  path.join(componentDir, `${componentName}.module.css`),
  cssContent
);

// Create TSX file with default React component
const tsxContent = `import styles from './${componentName}.module.css';

type ${componentName}Props = {}
function ${componentName}(props: ${componentName}Props) {
  return (
    <div className={styles.container}>
		${componentName}
    </div>
  );
}

export default ${componentName};
`;
fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), tsxContent);

// Create story file
const storyContent = `import type { Meta, StoryObj } from "@storybook/react-vite";

import ${componentName} from "./index";

const meta = {
  title: "${componentName}",
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
`;
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.ts`),
  storyContent
);

// Create index.ts file for barrel export
const indexContent = `export { default } from './${componentName}';\n`;
fs.writeFileSync(path.join(componentDir, "index.ts"), indexContent);

console.log(`✓ Component '${componentName}' created successfully!`);
console.log(`  Created: ${componentDir}/`);
console.log(`  - ${componentName}.module.css`);
console.log(`  - ${componentName}.tsx`);
console.log(`  - ${componentName}.stories.ts`);
console.log(`  - index.ts`);
