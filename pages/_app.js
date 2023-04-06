import Layout from "@/components/layout";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
  return (
    
	<Container>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</Container>

  );
}
