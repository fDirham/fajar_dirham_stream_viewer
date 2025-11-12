import styles from "./App.module.css";
import Chat from "./components/Chat";

function App() {
  return (
    <main className={styles.container}>
      <Chat />
    </main>
  );
}

export default App;
