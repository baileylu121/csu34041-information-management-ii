{
  perSystem =
    { pkgs, lib, ... }:
    {
      packages.default = pkgs.stdenvNoCC.mkDerivation {
        name = "zensical-site";
        src = lib.cleanSource ../.;

        nativeBuildInputs = [ pkgs.zensical ];

        buildPhase = ''
          zensical build
        '';

        installPhase = ''
          cp -r site $out
        '';
      };
    };
}
