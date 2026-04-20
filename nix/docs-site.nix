{
  perSystem =
    { pkgs, lib, ... }:
    {
      packages.docs-site = pkgs.stdenvNoCC.mkDerivation {
        name = "zensical-site";
        src = lib.cleanSource ../.;

        nativeBuildInputs = [
          pkgs.zensical
        ];

        buildPhase = ''
          zensical build
        '';

        installPhase = ''
          cp -r site $out
        '';
      };
    };
}
