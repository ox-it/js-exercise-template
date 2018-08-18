# Creating a new VM

## Create the VM in the interface
  * Click Add VM
  * On the 'New Virtual Machine' dialog, select 'New Virtual Machine...'
  * Set the vm name and computer name to follow the format <project>-<branch>-<env>-wm
  * Select Linux, Ubuntu 64
  * Defaults are usually ok for the hardware.
  * select the External network with static IP pool (or manual if desired ip is known)
  * finish
  * Once created, change machine to use a static IP, but use the same IP

## Install Ubuntu
  * Insert ubuntu 14 disk
  * Power on
  * Click the screen to interact.
     * It may be necessary to add an ssl exception. See https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2058496

### Follow the ubuntu installation wizard
    * English
    * Install Ubuntu Server
    * English
    * UK
    * Don't detect keyboard layout
    * English UK keyboard
    * English (UK, Macintosh) layout
	* configure network manually
	* enter IP address as shown in vcloud interface
	* enter netmask / gateway from vcloud interface network tab
	* name server addresses: 163.1.2.1 129.67.1.1 129.67.1.180
	* hostname = the machine name chosen earlier ( e.g. wf-dev-ci-wm )
	* domain = it.ox.ac.uk
	* user = project username. e.g. 'workplaces'
	* username = as above
	* password - autogenerate a secure password using keepass
	* don't encrypt home dir
	* accept time zone
	* Guide - use entire disk with LVM
	* no proxy
	* Install security updates automatically
	* Add openSSH server
	* Install GRUB boot loader
	
	
## First time machine setup

### Create the ubuntu user
  * from the local puppet repository (```..../puppet/fabric/ubuntu-ssh```)
  * run ```fab setup_ubuntu```
  * update the hosts file to include only the server being updated
  * update the local ssh_config file to connect as the ubuntu user
  * ssh into the machine using the user account created during os install
  * ```sudo su ubuntu``` and create a ~/.ssh/authorized_keys file containing your own ssh key
  * from local machine ```cd ../ubuntu-puppet-agent-install```
  * from local machine, run ```fab install```
  * ssh into new server as ubuntu user
  * modify ```/etc/puppet/puppet.conf``` to insert the line ```server=puppet-master.oucs.ox.ac.uk``` at the end of the ```[main]``` block
  * run ```sudo puppet agent -t```
  * log into the puppet master server
  * sign the cert with ```sudo puppet cert sign <hostname>```
  * run ```sudo puppet agent -t``` once more on the vm
  
## Deploy the app

  * Create VSTS deploy and run
  * log into machine as project user
  * cd to project deployment dir
  * run ```npm run start``` 