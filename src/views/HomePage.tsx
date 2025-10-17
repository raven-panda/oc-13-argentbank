import styles from '@/assets/css/home-page.module.css';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className={styles.featuresContainer}>
        <FeatureItem
          iconPath="icon-chat.png"
          iconAlt="Chat Icon"
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItem
          iconPath="icon-money.png"
          iconAlt="Money Icon"
          title="More savings means higher rates"
          description="The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItem
          iconPath="icon-security.png"
          iconAlt="Security Icon"
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <div className={styles.hero}>
      <section className={styles.heroContent}>
        <h2 className="sr-only">Promoted Content</h2>
        <p className={styles.heroContentSubtitle}>No fees.</p>
        <p className={styles.heroContentSubtitle}>No minimum deposit.</p>
        <p className={styles.heroContentSubtitle}>High interest rates.</p>
        <p className={styles.heroContentText}>
          Open a savings account with Argent Bank today!
        </p>
      </section>
    </div>
  );
}

function FeatureItem({
  iconPath,
  iconAlt,
  title,
  description,
}: {
  iconPath: string;
  iconAlt: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.featuresItem}>
      <img src={iconPath} alt={iconAlt} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
