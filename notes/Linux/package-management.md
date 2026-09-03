# Package management on Ubuntu

## The GNU Project

The goal of the project was to build an operating system like Unix but made of entirly free softwares called GNU operating system.

GNU public license (GPL)

The commands are free softwares that are part of the GNU project.

https://www.gnu.org/software/software.html

https://help.ubuntu.com/community/Repositories/Ubuntu

https://packages.ubuntu.com/

Show the codename of ubuntu distribution

```
lsb_release -a
```

```
uname -m
```
## APT cache

`apt-cache` is a command-line tool for querying APT's local package metadata without contacting the internet or actually installing anything. Common uses:

```
apt-cache search {keyword}
apt-cache show {pkg name}
```

It's read-only and fast because it's just querying locally stored `index files` — it never re-downloads anything itself. The index files are what lives in `/var/lib/apt/lists`.

Update the cache:

```
sudo apt update
```

When you run `apt update`, APT contacts each repository listed in `/etc/apt/sources.list` (and `/etc/apt/sources.list.d/`) and downloads their Packages/Release index files — essentially giant text files listing every package available in that repo, along with metadata. These get saved into `/var/lib/apt/lists`, named after the repo URL, e.g.:
```
/var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_jammy_main_binary-amd64_Packages
```

After updating the cache, the packages can be upgraded to the latest version by:

```
apt-get upgrade
```

## APT install package



```
apt install {pkg name}
apt source {pkg name}
```

## APT uninstall package

Uninstall a package **without** removing its configuration files:

```
sudo apt remove {package name}
```

Uninstall a package and remove its configuration files:

```
sudo apt purge {package name}
```

Uninstall dangling dependencies

```
sudo apt autoremove
```

## Archives

When a package is intalled, the archive is downloaded and placed here: `/var/cache/apt/archives`.

Clean up all the archives:

```
sudo apt clean
```
Clean up the archives that are no longer accessible (can't download from ubuntu repositories):


```
sudo apt autoclean
```