import LoginPage from "../../component/Auth/login";
import { Locale } from '../../../../../../i18n.config';

const Page = async ({
  params
}: {
  params: { lang: string; BN: Locale }
}) => {
  const { lang, BN } = params;

  return (
    <div>
      <LoginPage login={lang} />  
    </div>
  );
};

export default Page;
