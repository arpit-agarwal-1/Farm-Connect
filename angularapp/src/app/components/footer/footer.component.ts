import { Component } from '@angular/core';



interface FooterLink {
  label: string;
  path: string;
}

interface FooterGroup {
  category: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public socials: SocialLink[] = [
    { icon: 'facebook', routerLink: '#' },
    { icon: 'x', routerLink: '#' },
    { icon: 'public', routerLink: '#' },
    { icon: 'groups', routerLink: '#' },
  ];

  public footerGroups = [
    {
      category: 'For Owners',
      links: [
        { label: 'Manage Livestock', path: '/livestock' },
        { label: 'Request Feed', path: '/marketplace' },
        { label: 'Request History', path: '/my-requests' },
        { label: 'Health Tracking', path: '/health' },
      ],
    },
    {
      category: 'For Suppliers',
      links: [
        { label: 'Manage Inventory', path: '/feed/manage' },
        { label: 'Pending Orders', path: '/requests' },
        { label: 'Business Growth', path: '/growth' },
      ],
    },
    {
      category: 'Resources',
      links: [
        { label: 'Farming Tips', path: '/blog' },
        { label: 'Feed Quality Guide', path: '/guides' },
        { label: 'Community Forum', path: '/forum' },
      ],
    },
    {
      category: 'Company',
      links: [
        { label: 'About Connect', path: '/about' },
        { label: 'Support Center', path: '/support' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
  ];

  // Bottom Bar Links
  public bottomLinks: FooterLink[] = [
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
    { label: 'About', path: '/about' },
  ];

}
