{
  perSystem =
    { pkgs, self', ... }:
    {
      packages.default = pkgs.runCommandLocal "full-site" { } ''
        mkdir -p "$out"
        ln -sf ${self'.packages.docs-site} "$out/docs"
        ln -sf ${self'.packages.quiz-site} "$out/quiz"
        ln -sf ${../index.html} "$out/index.html"
      '';
    };
}
