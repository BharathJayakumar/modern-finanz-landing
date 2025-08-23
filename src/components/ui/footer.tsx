export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Die modernste Finanzkanzlei Deutschlands
          </h3>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
            Ihr Partner für moderne Finanzplanung, Vermögensaufbau und sichere Altersvorsorge.
          </p>
          
          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-sm text-primary-foreground/70">
              © 2024 Die modernste Finanzkanzlei Deutschlands. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};